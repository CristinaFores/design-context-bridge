# Plugin setup

The Figma plugin runs inside Figma desktop and pushes design context to the AI in real time.

The plugin is **not published on the Figma Community**, so you add it manually by importing its manifest. This is a one-time step (about a minute) and gives you the exact same plugin — Figma just loads it from your local copy instead of the Community.

## Requirements

- Figma desktop app (the manifest import option is **not** available in the browser version)
- Node.js ≥ 18
- An MCP-compatible AI client

## Install the plugin

1. **Get the files.** Clone or download this repo to your machine. The built plugin (`figma-plugin/code.js`) is already committed, so you don't need to build anything.
2. **Open the importer.** In **Figma desktop**, go to the menu → **Plugins → Development → Import plugin from manifest…**
3. **Select the manifest.** Choose `figma-plugin/manifest.json` from your local copy of the repo.
4. **Run it.** Open any file, then go to **Plugins → Development → Frontend Handoff Snapshot** to launch it.

The imported plugin stays in your **Plugins → Development** menu across restarts — you only import it once. If you move or delete the repo folder, Figma won't find it anymore, so keep the folder where it is (or re-import after moving it).

## Status indicators

| Status | Meaning |
|--------|---------|
| ⚪ Sync paused | Nothing is being sent. Press **Sync selection** to start. |
| 🟢 Connected to local handoff tool | Synced — the local server has your selection data |
| 🔴 Local handoff tool not running | Sync is on, but the server on `localhost:3055` isn't reachable — start your MCP client first |

## Usage

Select any frame, component, or layer in Figma, then press **Sync selection**. The plugin will keep pushing your selection while sync is on; press **Pause** to stop.

Keep the plugin window open while syncing. On-demand navigation tools (`get_node_info`, etc.) require sync to be on and the plugin to be live and responding.

## Verify the bridge is running

```bash
curl -X POST http://localhost:3055/update \
  -H "Content-Type: application/json" -d '{}'
# → {"ok":true}
```

## Custom port

The default port is `3055`. To change it, set `FIGMA_BRIDGE_PORT` in your MCP client env — but you must also update the hardcoded port in `figma-plugin/code.ts` and rebuild the plugin:

```bash
npm run build:plugin
```

Then re-import the manifest in Figma.
