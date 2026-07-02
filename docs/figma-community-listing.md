# Figma Community listing copy

Ready-to-paste copy for the Figma Community submission form. Lead with the inspector (works with zero setup) so a reviewer can see value immediately, then present export as an optional, user-controlled feature. Keep this wording out of the manifest/UI too — none of it should mention MCP, AI agents, or specific AI tools as the primary positioning.

## Name

Frontend Handoff Snapshot

## Tagline

Inspect colors, type, spacing and layout tokens from any selection — and optionally export a handoff snapshot to a local tool on your own machine.

## Description

Frontend Handoff Snapshot is a developer inspector for Figma. Select any layer, frame, or component and instantly see its implementation details — colors (with hex and opacity), text styles, spacing, and auto-layout values. This works with no setup and no network: nothing leaves Figma.

For teams that want to pull those details into their own tooling, the plugin can also export a snapshot of the selection (layers, colors, text styles, spacing, variables, and prototype interaction notes) to a local handoff tool running on the user's own machine. This export is optional, off by default, and fully user-controlled.

The plugin never modifies the Figma file. When export is used, data is only ever sent to `http://localhost:3055` on the user's own device.

## Optional export — how to run the local handoff tool

The inspector needs nothing. The **Export** button only works when the user starts the companion tool on their own machine first. To run it:

```bash
git clone https://github.com/CristinaFores/design-context-bridge.git
cd design-context-bridge
npm install
npm run build
npm start          # starts the local handoff bridge on http://localhost:3055
```

Then, in Figma: open the plugin, select a layer, and press **Export selection**. The status dot turns green when connected. Press **Stop** to pause export at any time.

If the tool is not running, Export simply waits — the plugin shows an "expected until you start it" message and keeps inspecting normally. No error blocks the plugin.

## Notes for the reviewer (if there's a free-text field)

The plugin's core feature — the design inspector — works with zero setup and no network access, so it can be reviewed without running anything. Just select a layer to see its colors, text styles, and spacing.

The **Export** button is an optional, user-initiated feature that sends the current selection to a local server on the user's own machine at `http://localhost:3055`, started and controlled by the user (setup steps above). No data leaves the device, and nothing is sent until the user presses Export. If the local tool is not running, the browser will log a `net::ERR_CONNECTION_REFUSED` for the localhost request — this is the expected, harmless result of the optional tool being off, and the plugin handles it gracefully in its UI. The plugin does not read or write any third-party or remote service, and never modifies the Figma file.
