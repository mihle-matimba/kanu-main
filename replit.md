# CompIQ Compensation Suite

A pre-built static frontend application — a compensation intelligence dashboard (CompIQ).

## Project Overview

This is a fully pre-compiled static site. All assets are bundled and ready to serve. No build step is required.

## Structure

- `index.html` — Entry point
- `assets/` — Pre-built CSS, JS, and image assets
- `package.json` — Node.js project (serves the static files)

## Running the App

The app is served using the `serve` npm package:

```
npx serve -s . -l 5000
```

This runs on port 5000, accessible via the Replit preview pane.

## Deployment

Configured as a **static** deployment with `publicDir: "."` — the root directory contains `index.html` and the `assets/` folder.
