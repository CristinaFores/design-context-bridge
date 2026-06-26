# REST API mode

Read any Figma file by URL — no plugin, no selection needed.

## Requirements

- A Figma personal access token
- Node.js ≥ 18

## Get a token

1. Open Figma → click your **avatar** → **Settings**
2. Go to **Security** → **Personal access tokens**
3. Click **Generate new token**, name it (e.g. `figma-dev-bridge`), and copy it

## Add it to your client config

Add `FIGMA_ACCESS_TOKEN` to the `env` block of your MCP server entry. Example for Claude Code:

```json
{
  "mcpServers": {
    "figma-dev-bridge": {
      "command": "npx",
      "args": ["-y", "figma-dev-bridge"],
      "type": "stdio",
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_xxxxxxxxxxxx"
      }
    }
  }
}
```

See [clients.md](clients.md) for the exact config path and format for every supported client.

## Tools

| Tool | What it does |
|------|-------------|
| `get_file_from_url` | Returns pages, top-level frames, and metadata for any Figma file URL |
| `get_node_from_url` | Returns a specific node from a URL that includes `?node-id=X-Y` |

## Example

```
get_file_from_url {
  url: "https://www.figma.com/design/BLIwwwzcRVrVb2CxhfMCtG/My-File"
}

get_node_from_url {
  url: "https://www.figma.com/design/BLIwwwzcRVrVb2CxhfMCtG/My-File?node-id=0-1"
}
```
