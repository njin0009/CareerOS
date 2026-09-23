# Repository Guidelines

## Project Structure & Module Organization

CareerOS is a Vue 3, TypeScript, and Vite single-page application. Application code lives in `src/`:

- `pages/`: route-level views such as `DashboardPage.vue` and `TrackerPage.vue`.
- `components/`: reusable interface and workflow components.
- `stores/`: reactive domain state and browser-local persistence coordination.
- `services/`: recommendation, storage, and export logic.
- `data/`: reviewed JSON datasets and metadata.
- `styles.css`, `extra.css`, and feature CSS files: shared and scoped visual rules.

`dist/` is generated output; do not edit it. Product behavior and maintenance notes are documented in `FUNCTIONS.md` and `PRODUCT-STRUCTURE.md`. There is currently no dedicated test or static-asset directory.

## Build, Test, and Development Commands

- `npm install`: install the locked dependencies.
- `npm run dev -- --host 127.0.0.1`: start the local Vite server.
- `npm run typecheck`: run Vue and TypeScript checks without building.
- `npm run build`: type-check and create the production bundle in `dist/`.
- `npm run migrate:data`: run the data migration script in `../scripts/` when its inputs are available.

Run `npm run build` before handing off any change.

## Coding Style & Naming Conventions

Use TypeScript and Vue Composition API with `<script setup>`. Prefer two-space indentation, semicolons in TypeScript, and readable multiline templates. Name components and pages in PascalCase (`ResumeStrategy.vue`), functions and variables in camelCase, and JSON fields consistently with the existing schema. Keep domain types in `src/types.ts`; do not duplicate interfaces across pages. Reuse existing CSS tokens such as `--mint`, `--muted`, and `--line`.

## Testing Guidelines

No automated test framework or coverage threshold is configured. For every change, run `npm run typecheck` and `npm run build`. Manually verify affected routes, responsive layouts, keyboard controls, local-storage persistence, empty states, and backup/restore compatibility. If tests are introduced, place them beside the unit as `*.spec.ts` and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

No Git history is available in this checkout, so no repository-specific commit convention can be inferred. Use concise imperative commits, for example `Add resume onboarding questionnaire`. Pull requests should explain the user problem, list affected routes and stored-data changes, report validation performed, and include screenshots for visible UI changes. Link the relevant issue when one exists.

## Security & Data Integrity

Profile, résumé, checklist, and application data are stored in the browser. Never commit personal exports or résumé files. Treat company recommendations as research guidance, not verified vacancies or immigration advice. Preserve backward compatibility for saved data and require confirmation before destructive restore or deletion operations.
