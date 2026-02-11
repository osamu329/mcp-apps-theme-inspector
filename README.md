# MCP Apps Theme Inspector

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/osamu329/mcp-apps-theme-inspector)

An [MCP Apps](https://github.com/modelcontextprotocol/ext-apps) tool that visualizes CSS theme variables injected by the host (e.g. Claude.ai). Runs as a Cloudflare Worker.

## Features

**Variables tab** — Semantic color group cards (Primary, Info, Success, Warning, Danger, …) each rendering mini-components (alert, badge, focus ring) styled with the group's `bg` / `text` / `border` / `ring` variables. Also shows typography scales (EN/JA), font families, font weights, border radii, and shadows.

**Preview tab** — Full UI component samples: headings, body text, cards, status badges, buttons (primary / ghost / info / success / warning / danger / disabled) with hover/focus ring, bordered list, and focus ring demo. All with Japanese text.

**Theme toggle** — Light / Dark switch in the top-right corner via `applyDocumentTheme`.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the UI locally with Vite. CSS variables won't be populated unless running inside an MCP host.

## Build & Deploy

```bash
npm run deploy
```

Builds the UI (Vite + vite-plugin-singlefile → single HTML), bundles the Worker (esbuild), and deploys to Cloudflare Workers via `wrangler deploy`.

## How it works

1. The **server** (`src/server/index.ts`) registers an MCP resource (`ui://theme-inspector`) and a tool (`inspect-theme`) using `@modelcontextprotocol/ext-apps/server`. The bundled HTML is injected at build time.

2. The **UI** (`src/ui/`) connects to the host via a permissive `postMessage` transport, receives the host context (theme + CSS variables + fonts), and applies them with `applyHostStyleVariables` / `applyHostFonts` / `applyDocumentTheme` from `@modelcontextprotocol/ext-apps`.

3. All rendering reads live `var(--*)` values via `getComputedStyle`, so the inspector reflects whatever the host provides.

## Project Structure

```
src/
├── server/index.ts        # Cloudflare Worker — MCP server
├── shared/constants.ts    # Color groups, type scales, radii, shadows
└── ui/
    ├── index.html         # Shell (tabs + theme toggle)
    ├── main.ts            # App init, host context, tab switching
    ├── styles.css         # All styles using var(--*) references
    ├── variables-view.ts  # Variables tab rendering
    └── preview-view.ts    # Preview tab rendering
scripts/
└── build-server.js        # esbuild script injecting HTML into Worker
```

## License

MIT
