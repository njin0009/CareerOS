# CareerOS: action-first structure

## Why this structure

Dashboard answers the daily questions: next action, research targets, and submitted-application progress. Profile contains slower-changing personal details and materials. Company/industry/role pages remain reference and exploration tools. Tracker remains the source of application records.

No existing function was deleted. The original Dashboard (five clickable statistics, eight recommendations, full data status and weekly workflow) is retained inside an expandable section. All original routes, company filters/pagination/rule explanations, company details, industry pages, roles, visa strategy, sources and tracker exports/backups remain.

## Added functions

- Action Dashboard: first incomplete checklist item links to its relevant tool.
- Five locally saved, reversible checkboxes; reset appears when all are done.
- Top three research targets using the existing fitScore and visaFit rules.
- Submission/interview counts, last three added records and up to three 7-day follow-up suggestions.
- Visible dataset date and source link, separate from UI modification time.
- Profile: editable identity, education, strengths, goals, visa self-description and LinkedIn/SEEK/portfolio links.
- PDF resume storage and download, max 2 MB; JSON profile/resume backup and restore.
- Safe external HTTP(S) links; no platform account integration.

## Metric and recommendation limits

Submitted = tracker records whose current status is 已投递, 面试中, Offer or 拒绝. Interview = 面试中 records. These are manual records, not verified employer submissions. Duplicate records count twice. Company status totals remain independently visible in the original Dashboard.

Follow-up suggestions require 已投递 and a recorded date at least seven days ago. They are reminders, not deadline detection. Recent entries mean most recently added, not most recently dated.

Company rankings still use the original persona formula. Profile edits do NOT automatically change rankings. No live job feed or automatic work-right check is implemented. All action checkmarks are manual.

## Inspiration and deliberate omissions

Teal: https://help.tealhq.com/en/articles/14435727-how-to-track-your-job-applications
Inspired application-stage organisation, with application records separate from company exploration.

Reactive Resume: https://github.com/reactive-resume/reactive-resume
Inspired portable personal materials. No source code was copied.

Not added: automated applications, ungrounded AI match probability, LinkedIn/SEEK scraping, or a full resume design editor. These add complexity, privacy or accuracy risks and do not solve the immediate next-action problem. These are omissions of new features, NOT deletions.

## Maintenance

- src/components/ActionDashboard.vue: action definitions and progress summaries.
- src/stores/profile.ts: typed profile state, local persistence and safe-link helper.
- src/pages/ProfilePage.vue: profile/material editor and profile-specific backup.
- src/pages/DashboardPage.vue: new action component plus retained original view.
- src/data/metadata.json: dataset date, verified signal count and limitations.
- src/services/recommendations.ts: unchanged ranking and visa heuristics.
- src/workspace.css: responsive styles.

Local browser storage is not cloud storage or a file in D:\CareerOS. Clearing storage loses profile, resume and checklist. Profile backup contains personal data and is separate from the original tracker backup; download both for a complete personal backup. Checklist is stored separately and is not included in either backup.
