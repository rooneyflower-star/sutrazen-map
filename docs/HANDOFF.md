# SutraZen — current handoff

Last updated: 2026-11-14
Status: Twelve-link preview approved; user explicitly authorized production publication. Verify the Pages run for this release before claiming live deployment.

## Current implementation
- `twelve-links/` contains the native guide and reader, 77 pages (18 narrative scenes plus the original afterword), 18 original reader illustrations, cover, 5460×7170 Wheel of Life, storyboard and SHA-256 manifest.
- The fourth shelf entry links to the book, guide and original scriptures; 14 books total, 4 readable, 10 locked. Existing three books, map, artwork and video embeds are preserved.
- Fixed scripture-dialog navigation and keyboard navigation after button focus. Reading position survives guide navigation and orientation changes.
- Static full-frame Wheel of Life has 12 outer labels at least 12px. The author accepted the image and requested fine adjustments to birth/name-and-form endpoints; revision two includes these and a Four Noble Truths-style 16:9 YouTube frame.
- Removed the guide's trial badge and noindex directive for release. Reader noindex follows the established reader convention.

## Verified before publication
- All 77 pages at 390×844, 844×390, 768×1024 and 1024×768: illustrations, page numbers, scripture content, page buttons, keyboard, simulated swipe, scene menu, orientation retention and scripture dialog navigation.
- Original BOOK data and image hashes preserved; native local paths/anchors and fourth shelf entry checked. Revised coordinates and 16:9 video layout checked at four sizes.
- Downloadable single-file trial routing tested over local HTTP. Production reader does not use the trial's iframe packaging.

## Remaining verification and release record
- Real iPad/Safari and actual external YouTube playback were not tested in this environment. External scripture and independent image source/license records remain unverified; original credits are preserved.
- Publication is explicitly authorized by the user, after preview review. This document records approval and implementation, not evidence of a completed Pages run.
- Supply a ZIP from the exact published commit and report the deployment result. If Notion tools are absent, provide pending text for https://www.notion.so/40bcf2ef57db81658247c1e8268c3ccd and clearly state it has not been written.

---

# Earlier design and preview history

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

### Preview follow-up: wheel endpoint corrections and consistent video UI
- Author approved the image, requesting the birth endpoint move slightly inward to its sector boundary and the name-and-form endpoint move outward. Updated only those two endpoints in both the rendered SVG and coordinate data; other labels/artwork remain unchanged.
- Added the same 16:9 lazy-loaded YouTube iframe component used by the Four Noble Truths guide, plus a direct YouTube fallback link, for video yaWXpSQqOx4.
- Rebuilt the downloadable trial. This remains an unpushed local preview, awaiting confirmation before publication. Video layout can be checked locally; external playback depends on YouTube/network access and is not claimed unless verified.

## 2026-11-14 — Consistent topic-guide headers
- User authorized direct publication after comparing all four completed guides. Standardized Four Noble Truths, Five Aggregates, Six Senses and Twelve Links to a single SutraZen brand and right-side 「回三十七道品修道地圖」 link to the site root.
- All four guides use the same root `guide-header.css` and header markup. The twelve-link guide no longer has a separate three-item header menu; its scripture and reading links remain in page content and the reader.
- Scope is guide headers only. Reading controls, book text/data, illustrations, map, shelf and videos remain unchanged.
- Validate shared styling at mobile and desktop widths, root return link, and each guide-to-reader entry before deployment. Actual Pages status must be checked; real iPad/Safari remains unverified.

## 2026-11-14 — Common guide UI and real video previews
- User requested direct publication after finding Five Aggregates used a green link placeholder instead of a YouTube iframe. Replaced it with the same real 16:9 lazy-loaded embed used in all four guides.
- Added root guide-ui.css for common content width, title/lead typography, spacing and video presentation, while retaining guide-header.css for the single return-to-map header.
- Removed extra same-page shortcuts outside the scripture sections, repeated end-of-guide reading CTA, source index shortcuts and separate under-video links. Primary book covers, real scripture sections, source citations within them, shelf and reader navigation remain.
- Guide content, scripture quotations and reader files/artwork must be preserved; validate all four at phone, tablet and desktop widths before release. Real iPad/Safari and external YouTube playback remain separate unverified checks unless exercised.
