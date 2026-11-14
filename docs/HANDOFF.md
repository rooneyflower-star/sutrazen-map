# SutraZen — current handoff

Last updated: 2026-11-14
Status: Design notes prepared; no coding or deployment authorized by this document alone.

## Current priority: Twelve Dependent Origination (十二因緣) picture book

### Decisions from ChatGPT discussion
- A high-resolution Wheel of Life / bhavacakra (生命之輪) illustration is planned to explain the twelve links.
- The latest preferred direction is a full-frame/static illustration with legible labels, rather than fragile hotspots or excessive interactions.
- Place labels along the outer curved edge of the twelve-link ring where possible, so they do not cover the important visual content.
- Label connector endpoints should touch the edge of the relevant sector, not extend into the sector center.
- Preserve consistency with prior picture books for reading/navigation controls and portrait/landscape layouts.
- The author reported that some preview controls were unresponsive; this has not been diagnosed or reproduced in this repository.
- The author could not reliably preview the latest twelve-link draft and asked to try publishing for direct review, but publication was not verified.

### What is actually verified
- On 2026-11-14 the repository root contained five-aggregates/, four-truths/, six-senses/, index.html, shelf.css, README.md.
- No twelve-dependent-origination directory was present at the repository root.
- Therefore the latest twelve-link HTML and artwork cannot be assumed to exist in GitHub.

### Codex next steps — only when explicitly requested
1. Inspect the existing picture books and identify their actual navigation and responsive layout conventions.
2. Locate the latest twelve-link source/artwork in the repository. If absent, request the approved draft/assets from the author or ChatGPT handoff; do not invent them.
3. Implement the agreed static/full-frame artwork and outer-edge labels without obscuring the illustration.
4. Check all controls in portrait and landscape; test on a real browser when available.
5. Provide a reviewable preview or branch and describe test results.
6. Publish only with explicit user approval.

### Handoff maintenance
After each implementation task, record: approved scope, changed files, tests performed, known limitations, preview/deployment status, and the next decision needed.

### Do not treat as final without verification
- Copyright/license status and image attribution for the Wheel of Life image
- Exact final label positions and source artwork resolution
- Final HTML/JS implementation
- Live deployment and tablet behavior

## 2026-11-14 — 十二因緣整合試閱（本地，等待作者確認）

Approved scope: recover and integrate the supplied preview, preserve all artwork and pages, fix defects, and prepare a reviewable trial before any publication.

- Added `twelve-links/`: native guide/book pages, separate CSS/JS/data, extracted original assets, a 77-row storyboard and SHA-256 manifest. No iframe is needed for normal website reading.
- Preserved the exact BOOK data: 18 narrative scenes (76 pages) plus the original afterword (page 77 / scene 19). Preserved all 18 reader illustration hashes, the original cover and 5460×7170 Wheel of Life.
- Fixed scripture-dialog navigation to real guide anchors and keyboard arrows while a navigation button retains focus. Session reading position survives guide/book navigation.
- Kept the full static Wheel of Life at its natural ratio. Adjusted outer-ring leader endpoints and made all 12 labels at least 12px, without overlapping labels at tested widths. Final visual alignment remains subject to author review.
- Prepared the fourth shelf entry and readable count in the local branch; other books, artwork, map and videos are unchanged.
- Local Chromium tested all 77 pages at 390×844, 844×390, 768×1024 and 1024×768, including image loading, scripture content, keyboard/buttons, simulated swipes, scene menu, orientation retention and scripture-dialog links. Downloadable single-file preview was separately tested over local HTTP, including its parent/iframe scripture routing.
- Preview-only single HTML packaging uses an iframe for portability; production directory uses normal links. Browser policy blocked file:// testing, so offline file execution is not claimed as verified.
- Not verified: real iPad/Safari, independent image license/source records and all external reference sites. Existing credits retained; no publication authorized until author confirms trial.
- Status: local preview branch only; no push, PR, production merge or deployment performed. Next: author reviews trial, labels and image credits; then explicitly approves publication.
