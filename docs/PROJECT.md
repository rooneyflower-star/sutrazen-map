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
- twelve-links/ — twelve-link picture book, guide, static Wheel of Life, 77-page data, storyboard and original extracted assets
- eightfold-path/ — preview implementation: 110-page Eightfold Path / Ten Wholesome Actions reader and guide; original 13-scene handoff and 11 illustrations in docs/eightfold-path/
- README.md

The twelve-link reader is implemented in twelve-links/ and preserves 77 pages: 18 narrative scenes plus an afterword. The author approved publication on 2026-11-14. Verify the corresponding GitHub Pages deployment before claiming live availability.

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

## Twelve-link release approval (2026-11-14)
The author reviewed two preview revisions and explicitly requested publication. The approved implementation includes native guide/book pages, original artwork, corrected scripture navigation and keyboard behavior, refined birth/name-and-form endpoints and the Four Noble Truths-style YouTube preview. See docs/HANDOFF.md for test coverage and remaining limitations.

## Eightfold Path preview (2026-11-14)
Implemented on `feat/eightfold-path-preview` from main `0236fca`, incorporating handoff `e121f3c`. Shelf #05 and the existing 八正道 map dialog link to the guide/reader in this branch. The four released books and shared guide styles remain unchanged. No publication authorized for this preview; production still reads main. See docs/eightfold-path/verification.md for source checks, pairing choices and separate editorial suggestions.
