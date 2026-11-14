# SutraZen project context

## Project
- GitHub repository: https://github.com/rooneyflower-star/sutrazen-map
- GitHub Pages entry point: https://rooneyflower-star.github.io/sutrazen-map/
- Related Buddhist learning map: https://sutrazen.netlify.app/map.html
- Primary language: Traditional Chinese (Taiwan)

## Repository structure (verified 2026-11-14)
- index.html — top-level site entry
- shelf.css — shared shelf styling
- five-aggregates/ — five aggregates picture book, including book/ and storyboard.csv
- four-truths/ — Four Noble Truths picture book, including assets/ and book/
- six-senses/ — six senses picture book, including book/ and cover.webp
- README.md

The twelve dependent origination picture book is being designed but no dedicated directory was present at the repository root when checked on 2026-11-14. Do not infer its source files or publication status.

## Visual and reading experience
- Picture-book visual language: gentle hand-drawn children's illustration, recurring kitten character where appropriate, 16:9 artwork.
- Prefer concise, accurate Traditional Chinese on illustrations; narration and textual content should be faithful to cited Buddhist texts.
- Navigation and layout should remain consistent across books, particularly portrait/landscape arrangements and touch controls on iPad.
- Before making a shared component, compare the actual behavior of existing books. Existing books may not yet use one common implementation.

## Collaboration model
1. ChatGPT and the author finalize research, storyboard, narration, artwork, and functional requirements.
2. Approved decisions are summarized in docs/HANDOFF.md.
3. Codex reads AGENTS.md, docs/PROJECT.md, docs/HANDOFF.md and the real codebase.
4. Codex implements a limited change and tests it, reporting what is verified versus pending.
5. The author reviews on iPad; only then proceed with any explicitly approved production publication.

## Important distinction
This repository does not necessarily contain every asset or HTML draft discussed in ChatGPT. If a required draft is absent, ask the author to supply it; do not fabricate missing content.

## Local twelve-link integration preview (2026-11-14)
The unpushed preview branch adds `twelve-links/` with separate guide/reader files, original extracted assets, storyboard and manifest. It preserves 77 pages (18 narrative scenes plus afterword). This describes local implementation, not main or live publication; see docs/HANDOFF.md for verification and remaining review.
