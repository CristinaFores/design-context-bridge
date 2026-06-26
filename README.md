# figma-dev-bridge

<p align="center">
  <img src="https://raw.githubusercontent.com/CristinaFores/figma-dev-bridge/main/.github/cover.svg" alt="figma-dev-bridge" width="100%"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/figma-dev-bridge"><img src="https://img.shields.io/npm/v/figma-dev-bridge?color=a78bfa&labelColor=18181b" alt="npm"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-4ade80?labelColor=18181b" alt="MIT"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-60a5fa?labelColor=18181b" alt="Node ≥ 18"/>
  <img src="https://img.shields.io/badge/tools-15-fb923c?labelColor=18181b" alt="15 tools"/>
  <a href="https://github.com/CristinaFores/figma-dev-bridge/actions"><img src="https://img.shields.io/github/actions/workflow/status/CristinaFores/figma-dev-bridge/ci.yml?branch=main&labelColor=18181b" alt="CI"/></a>
</p>

---

Most "Figma + AI" setups only expose what's currently selected — and grind to a halt on large files.

**figma-dev-bridge** is a client-agnostic [MCP](https://modelcontextprotocol.io) server that solves both problems. It streams your live selection continuously **and** lets the agent walk the whole document lazily, node by node, without ever loading the full tree at once. And if you just have a Figma URL, you don't even need the plugin.

| Without figma-dev-bridge | With figma-dev-bridge |
|--------------------------|----------------------|
| Copy-paste colors, spacing, tokens manually | AI reads them directly from Figma |
| Share screenshots for the AI to guess from | AI inspects the real node tree |
| Limited to what's selected | Navigate the whole document by node id |
| Stuck without the Figma app | Read any file via URL + access token |

---

## Two ways to connect

Choose based on your workflow — or use both at the same time.

### Plugin mode

The Figma plugin runs inside Figma desktop and pushes design context to the AI automatically. The agent sees your selection in real time and can navigate the full document on demand.

**Best for:** active design work where you want the AI to follow your selection.

### REST API mode

Pass any `figma.com` URL and the server calls the Figma REST API directly. No plugin, no Figma desktop, no selection needed — just a personal access token.

**Best for:** reviewing files you don't have open, or running the AI in a headless environment.

---

## Quick start

```bash
npx figma-dev-bridge
```

Add it to your AI client, connect the plugin or your access token, and start asking:

```
"What colors does this component use?"
"Find all instances of the Button component in this file."
"What spacing tokens are applied to this card?"
```

---

## How it works

```
Figma desktop              figma-dev-bridge            AI agent
──────────────    HTTP     ─────────────────   stdio   ──────────
  Plugin        ────────►  :3055 bridge     ◄────────  Claude Code
  (push/poll)              + MCP server                Cursor
                                                       OpenCode
              figma.com    ─────────────────           Windsurf
  Any file URL ────────►  REST API client              VS Code…
```

1. The **plugin** continuously pushes selection context and answers on-demand node requests from the AI.
2. The **MCP server** exposes 15 tools over stdio — selection tools serve cached context instantly; navigation tools fetch nodes live.
3. The **REST client** calls `api.figma.com` for any file when `FIGMA_ACCESS_TOKEN` is set.

---

## Documentation

| Guide | What it covers |
|-------|---------------|
| [Plugin setup](docs/plugin-setup.md) | Install the Figma plugin, verify the bridge, configure the port |
| [REST API setup](docs/rest-api.md) | Generate a Figma token, add it to your client config |
| [Client configuration](docs/clients.md) | Claude Code · Claude Desktop · Cursor · OpenCode · Windsurf · VS Code |
| [Tools reference](docs/tools.md) | All 15 tools — arguments, return values, and usage examples |

---

## Tools at a glance

| Group | Tools | Mode |
|-------|-------|------|
| **Selection** | `get_current_selection` · `get_selected_colors` · `get_selected_texts` · `get_selected_spacing` · `get_selected_interactions` | Plugin |
| **Document** | `get_current_page` · `get_all_pages` · `get_frame_by_name` · `get_component_definitions` · `get_variables` | Plugin |
| **Navigation** | `get_node_info` · `get_nodes_info` · `scan_nodes_by_types` | Plugin |
| **REST API** | `get_file_from_url` · `get_node_from_url` | Token |

→ Full reference with arguments and examples in [docs/tools.md](docs/tools.md)

---

## Where to start

**I want to use it with the plugin**
→ [Plugin setup](docs/plugin-setup.md) then [configure your client](docs/clients.md)

**I want to read files by URL without the plugin**
→ [REST API setup](docs/rest-api.md) then [configure your client](docs/clients.md)

**I want to see all available tools**
→ [Tools reference](docs/tools.md)

**I want to contribute or run it from source**
→ [CONTRIBUTING.md](CONTRIBUTING.md)

---

## License

[MIT](LICENSE) © Cristina Fores Campos
