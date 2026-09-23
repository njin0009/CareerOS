# CareerOS Australia

Maintainable Vue 3 + TypeScript source for the Australian career research and application tracker.

## Content updates

- Companies: `src/data/companies.json`
- Industry explanations: `src/data/industries.json`
- Verified company signals: `src/data/signals.json`
- Public sources: `src/data/sources.json`

Each company uses a stable `id`. Keep IDs unchanged after publication because company detail URLs depend on them.

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Original data migration

The original standalone file remains at `../australia-tech-career-targets.html`. Run `npm run migrate:data` only when intentionally replacing the JSON data from that file.

## Preserved capabilities

See `FUNCTIONS.md` for the complete mapping from the original 27 functions to the new modules and pages.
