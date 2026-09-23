# Complete feature and function inventory

## Discovery and navigation

- Dashboard statistics link to all companies, P1, Melbourne, industries and tracker.
- Industry index and individual industry pages.
- Search and filters for company, role, focus, city, industry and priority.
- Individual URL for every company.
- Top recommendations based on the preserved fit score.

## Decision support

- `visaFit` → `src/services/recommendations.ts`
- `fitScore` → `src/services/recommendations.ts`
- `timingFor` → `src/services/recommendations.ts`
- Company rationale, roles, focus areas, verified signals and official links.

## Tracking and portability

- `setStatus`, `updateActive` → `src/stores/career.ts`
- `tracks`, `addTrack`, `delTrack`, `renderTracker` → tracker store and `TrackerPage.vue`
- `download`, `exportCsv`, `exportTracker` → `src/services/export.ts`
- `backupData`, `restoreData` → `src/services/storage.ts` (data format preserved and versioned)
- Existing browser storage keys remain compatible.

## Original UI functions accounted for

`addTrack`, `backupData`, `closeDetail`, `delTrack`, `download`, `exportCsv`, `exportTracker`, `filtered`, `fitScore`, `focusView`, `init`, `openCompany`, `prefillTrack`, `render`, `renderEV`, `renderExplorer`, `renderSectors`, `renderSources`, `renderTop`, `renderTracker`, `restoreData`, `selectExplorerSector`, `setStatus`, `timingFor`, `tracks`, `updateActive`, `visaFit`.

Modal-only rendering functions are replaced by router pages. Render functions are replaced by Vue computed state and components, not removed behaviour.
