# Tools reference

15 tools in four groups. The first three require the Figma plugin; the last group uses the REST API.

---

## Selection tools

The plugin pushes these automatically when you select something in Figma. No arguments needed.

| Tool | Returns |
|------|---------|
| `get_current_selection` | Selected nodes with fills, position, size, and text content |
| `get_selected_colors` | Unique hex colors from the selection and all its descendants |
| `get_selected_texts` | Text nodes with content, font family, and font size |
| `get_selected_spacing` | Auto-layout gap and padding values, including the name of any bound spacing token |
| `get_selected_interactions` | Prototype reactions: trigger, action, destination, transition type, duration, easing |

---

## Document overview tools

Return cached document structure. No selection needed, but the plugin must be connected.

| Tool | Arguments | Returns |
|------|-----------|---------|
| `get_current_page` | — | Name and top-level frames of the current page (with node ids) |
| `get_all_pages` | — | All pages in the document with ids and child counts |
| `get_frame_by_name` | `name` | Frame or layer by name (case-insensitive partial match) |
| `get_component_definitions` | — | All components and component sets on the current page |
| `get_variables` | `type?` | All local design tokens by collection and mode. Filter: `COLOR` · `FLOAT` · `STRING` · `BOOLEAN` |

---

## On-demand navigation tools

Fetch nodes live from Figma by id. The plugin must be open (12 s timeout).

| Tool | Arguments | Returns |
|------|-----------|---------|
| `get_node_info` | `id`, `depth?` (default 2) | Any node by id and its children up to the given depth |
| `get_nodes_info` | `ids[]`, `depth?` (default 1) | Multiple nodes by id in one call |
| `scan_nodes_by_types` | `types[]`, `rootId?` | Every node whose type matches the list, capped at 1 000. Example types: `TEXT` `INSTANCE` `FRAME` `COMPONENT` `RECTANGLE` `VECTOR` |

**Navigation pattern:**

```
get_current_page                              # get frame ids
get_node_info { id: "12:34", depth: 2 }       # drill into a frame
get_node_info { id: "12:56", depth: 1 }       # keep drilling

scan_nodes_by_types { types: ["INSTANCE"] }   # find all component instances
get_node_info { id: "..." }                   # inspect one
```

---

## REST API tools

No plugin needed. Require `FIGMA_ACCESS_TOKEN` — see [rest-api.md](rest-api.md).

| Tool | Arguments | Returns |
|------|-----------|---------|
| `get_file_from_url` | `url` | Pages, frames, and metadata from any Figma file URL |
| `get_node_from_url` | `url`, `node_id?` | A specific node from a URL that includes `?node-id=X-Y` |
