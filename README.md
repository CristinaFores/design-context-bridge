# figma-dev-bridge

<p align="center">
  <img src="https://raw.githubusercontent.com/CristinaFores/figma-dev-bridge/main/.github/cover.svg" alt="figma-dev-bridge" width="100%"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/figma-dev-bridge"><img src="https://img.shields.io/npm/v/figma-dev-bridge?color=a78bfa&labelColor=18181b" alt="npm"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-4ade80?labelColor=18181b" alt="MIT"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-60a5fa?labelColor=18181b" alt="Node ≥ 18"/>
  <img src="https://img.shields.io/badge/tools-15-fb923c?labelColor=18181b" alt="15 tools"/>
</p>

**Client-agnostic MCP server** that gives any AI agent live access to your Figma designs.

Works with Claude Code, Cursor, OpenCode, Windsurf, VS Code, and any tool that supports [MCP](https://modelcontextprotocol.io).

---

## Two ways to connect

| | Plugin mode | REST API mode |
|--|-------------|---------------|
| **How** | Figma plugin running in desktop app | Figma personal access token |
| **Selection tools** | ✅ Auto-pushed in real time | ❌ |
| **Document navigation** | ✅ On-demand by node id | ❌ |
| **Read any file by URL** | ❌ | ✅ |
| **Requires Figma desktop** | Yes | No |

---

## Quick start

```bash
npx figma-dev-bridge
```

Then add it to your AI client — see **[client setup →](docs/clients.md)**

---

## Connect

- [Plugin setup](docs/plugin-setup.md) — install the Figma plugin for live selection context
- [REST API setup](docs/rest-api.md) — read any file by URL with a personal access token
- [Client configuration](docs/clients.md) — Claude Code · Cursor · OpenCode · Windsurf · VS Code

---

## Tools

15 tools across four groups — **[full reference →](docs/tools.md)**

| Group | Tools | Requires |
|-------|-------|---------|
| Selection | `get_current_selection` · `get_selected_colors` · `get_selected_texts` · `get_selected_spacing` · `get_selected_interactions` | Plugin |
| Document overview | `get_current_page` · `get_all_pages` · `get_frame_by_name` · `get_component_definitions` · `get_variables` | Plugin |
| Node navigation | `get_node_info` · `get_nodes_info` · `scan_nodes_by_types` | Plugin |
| REST API | `get_file_from_url` · `get_node_from_url` | Access token |

---

## Development

```bash
npm run build:all   # compile server + plugin
npm test            # build + test suite
npm run dev         # run without build (tsx)
```

See [contributing](CONTRIBUTING.md) for full dev setup.

---

## License

[MIT](LICENSE) © Cristina Fores Campos
