# SutraZen — Codex project instructions

## Purpose
Maintain the SutraZen Buddhist learning website and its interactive picture books. The human author discusses Buddhist source texts, storyboards, illustrations, narration, and interaction design in ChatGPT. Codex implements approved changes in this repository.

## Start of every task
1. Read this file, docs/PROJECT.md, and docs/HANDOFF.md.
2. Inspect the actual repository before modifying code. Treat documentation as context, not proof that a feature exists.
3. Follow the user's latest task instruction. If it conflicts with the handoff, ask before overwriting approved content.
4. Prefer small, reviewable changes. Do not recreate a picture book from scratch when existing source can be updated.
5. Do not assume unpublished artwork or HTML is present in GitHub. Request the missing asset/source when needed.

## Design and content rules
- Traditional Chinese (Taiwan) is the primary UI language. Proofread all Chinese labels carefully.
- Preserve the established gentle hand-drawn children's picture-book style and consistent kitten character wherever relevant.
- Respect the original Buddhist references and distinguish scripture quotations from creative explanatory narration.
- Preserve the established 16:9 illustration style where applicable.
- Maintain usability on iPad/iPhone, including portrait and landscape layouts.
- Reuse established navigation, reading controls, and interaction patterns from existing books rather than introducing inconsistent controls.
- Do not let annotations obscure important artwork or scripture text.
- Avoid adding unnecessary signposts, labels, or UI elements.

## Engineering and release safeguards
- Inspect index.html, shelf.css, and the relevant book directory before changing shared navigation.
- Preserve working books and their routes; do not delete or rename existing assets without explicit approval.
- Validate HTML/CSS/JS and test interactive buttons, navigation, image loading, and mobile portrait/landscape behavior as far as the environment permits.
- If browser testing is unavailable, report that limitation explicitly. Never claim a successful visual test without performing one.
- Do not deploy or merge into the production branch unless the user explicitly requests publication. Prefer a branch/PR for review when possible.
- Report which files changed, what was tested, and the preview or published URL only when verified.
- Update docs/HANDOFF.md after completing a task, recording what changed and what remains unverified.

## Source of truth
Actual repository files and verified live behavior govern implementation status. docs/HANDOFF.md records design decisions and outstanding work, not proof of deployment.
