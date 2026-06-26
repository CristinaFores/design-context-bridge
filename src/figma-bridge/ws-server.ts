import { createServer } from 'node:http';
import { store } from './store.js';
import type { FigmaDocumentContext } from '../core/types.js';

// Configurable, but must match the port hard-coded in figma-plugin/code.ts.
const HTTP_PORT = Number(process.env.FIGMA_BRIDGE_PORT) || 3055;

export function startFigmaBridge(): void {
  const httpServer = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'POST' && req.url === '/update') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const ctx = JSON.parse(body) as FigmaDocumentContext;
          store.setContext(ctx);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('{"ok":true}');
        } catch (_e) {
          res.writeHead(400);
          res.end('{"ok":false}');
        }
      });
      return;
    }

    // Plugin polls this to pull pending on-demand requests (queue is cleared).
    if (req.method === 'GET' && req.url === '/requests') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(store.takeRequests()));
      return;
    }

    // Plugin posts the result of an on-demand request here.
    if (req.method === 'POST' && req.url === '/response') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const { id, result } = JSON.parse(body) as { id: string; result: unknown };
          store.setResponse(id, result);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('{"ok":true}');
        } catch (_e) {
          res.writeHead(400);
          res.end('{"ok":false}');
        }
      });
      return;
    }

    res.writeHead(404);
    res.end();
  });

  httpServer.on('error', (err) => {
    if ((err as NodeJS.ErrnoException).code === 'EADDRINUSE') {
      process.stderr.write(`[bridge] Port ${HTTP_PORT} already in use — sharing store via file\n`);
    } else {
      process.stderr.write(`[bridge] HTTP error: ${err.message}\n`);
    }
  });

  // Bind to loopback only. The bridge must never be reachable from the LAN:
  // it relays private design context and accepts state-changing POSTs.
  httpServer.listen(HTTP_PORT, '127.0.0.1', () => {
    process.stderr.write(`[bridge] Listening on http://127.0.0.1:${HTTP_PORT}\n`);
  });
}
