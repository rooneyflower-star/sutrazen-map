# SutraZen — current handoff

Last updated: 2026-11-14
Status: **八正道與十善業道已獲作者明確發布授權；發布記錄見 PR #11 與對應 GitHub Pages 部署結果。**

## 2026-11-14 — 八正道發布授權與交付

- 作者明確指示「你直接發布吧，我看有問題再來改」，授權把本次新增內容合併 main 並發布；此最新指示取代本頁先前的試閱等待狀態。
- 發布 PR：https://github.com/rooneyflower-star/sutrazen-map/pull/11 。移除新主題導讀的 noindex；閱讀器沿現有慣例保留。故事、圖片、控制與所有舊書保持試閱測試版本。
- 正式入口：`eightfold-path/`（導讀）、`eightfold-path/book/`（110頁繪本）、首頁第05本與八正道心智圖說明窗。
- 合併與部署須以 PR 的 merge commit 及該 SHA 的 Pages 成功結果為準；不能只因 git push 成功而聲稱已上線。發布後另外驗證正式網址與新書操作。
- 每次正式發布的 ZIP 使用精確 merge commit。前次對話附件下載失敗，這次另提供 GitHub `/archive/<mergeSHA>.zip` 固定版本下載入口，並保留本地檔與 SHA-256。
- 此工作環境未提供 Notion 工具，尚未寫入改版頁。待補記文字保存於 `docs/releases/eightfold-path-notion.md`，不要把提供文字當成已更新 Notion。
- 暫定封面、白話校訂建議、實機 Safari、外部影片及註解深層定位等原有待確認項目仍保留，見下方。

## 本次範圍與基準

- 實作分支 `feat/eightfold-path-preview`，從最新 main `0236fca0c8ca0edbe3972bf51e4211ec33fd4e2f` 起作。已 fetch 並核對交接分支 `content/eightfold-path-handoff` 的 commit `e121f3c1f78535243ffbf75599a7f4e1e272e0fa`，只帶入 `docs/eightfold-path/`。
- 完整讀取最新 main 的四份規則／專案文件及交接 README、Markdown/JSON 分鏡、manifest；不依賴過去對話或 Notion 啟動實作。原交接檔原樣保留。

## 完成內容

- `eightfold-path/` 主題導讀、真實 YouTube 預覽（wabgCGL-Cfk）、12張經典卡；沿用 `guide-header.css`、`guide-ui.css`，右上只保留「回三十七道品修道地圖」，沒有新增額外快捷列或影片下重複連結。
- `eightfold-path/book/` 沿用最新十二因緣的橫直式、左右／底部控制、目錄、頁碼、經文展開、來源、返回與 session 閱讀位置。故事與原經均為可選取 HTML 文字。
- 13段、110筆原字幕依序製成110頁；11張正式原圖尺寸、大小與 SHA-256 全符，沒有重繪、刪鏡或 Base64。正志使用指定高清圖，正命完整末句保留；05/06段共用善行四格，13段為文字總結。
- 四格以 HTML 遮罩依字幕聚焦：每頁一格亮、三格暗；與原圖共同比例，未裁切圖像。
- 首頁第05本新增閱讀／導讀／原經，書架保留14本順序，分支內5可讀、9鎖定；八正道心智圖原說明窗增加導讀入口，原影片和既有道路連線保留。
- 現有四本閱讀器／導讀／插畫及共用樣式全部保持位元組相同。GitHub Pages 設定仍為 main 根目錄。

## 經文與校訂

- 12部參考經從 SuttaCentral 官方公開典籍資料核對，固定 commit 及雜湊見 `docs/eightfold-path/verified-sources.json`。片尾偈頌確定為雜阿含771。
- 下緣選文按段落主題配對，未假稱已復刻影片逐句經文時間。原故事、原分鏡轉錄、原典節錄與建議改寫各自分開。
- 鐵槍、世俗／出世間精進與正念、正定、筏喻的具體待校建議，見 `docs/eightfold-path/verification.md`；未擅自套用到原110筆字幕。
- 台大獅子吼直接存取遭 CONNECT 403；中阿含註解先提供明標四阿含總入口，深層經文定位待後續驗證，沒有套用雜阿含路徑猜測。

## 已通過的驗證

- Chromium 觸控模擬390×844、844×390、768×1024、1024×768，各110頁，共440次頁面檢查：全文、插畫、頁碼、三暗一亮與長寬比、無水平溢出。
- 翻頁、首尾停用、鍵盤、滑動、目錄、經文捲動不誤翻、橫式對話框／來源跳轉、方向切換／重載／返回保留頁數。
- 書架與心智圖新入口，以及既有四本的開書、翻頁與返回。建置／完整性腳本、JS語法與 diff 空白檢查通過。測試命令和範圍見 verification.md。

## 交付與剩餘項目

- 本次提供試閱分支／PR、完整目錄 ZIP 與四格焦點示範。導讀入口 `eightfold-path/`，閱讀器入口 `eightfold-path/book/`。
- 本環境缺少 `open_cloud_preview` 與桌面 JS 工具，不能提供經驗證的外部即時預覽 URL。ZIP 附本機 HTTP 啟動方式；file:// 被瀏覽器政策封鎖，未宣稱雙擊 HTML 已測試。
- 缺貓群片頭封面原圖，暫以正見地圖配 HTML 書名，內頁圖像完整。待作者確認封面與另列的白話校訂建議。
- 實體 iPad/Safari、外部 YouTube 播放及台大獅子吼深層定位未驗證。
- 作者已就本書明確授權正式發布，見本頁最新發布紀錄；上線結果以 PR #11 與 Pages 為準。原試閱版本完整保留於 commit `6c00958`。

---

# Prior handoff and release history

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

## 2026-11-14 — Consistent scripture source cards
- User authorized publication of the screenshot's source-card recommendation. Shared ChatGPT link was blocked by environment CONNECT 403; implementation follows the visible screenshot, not an unverified claim of reading the shared response.
- Standardized existing reference cards with edition/location metadata, pill buttons, original-text versus annotated-guide roles and explicit provider labels. Added matching 台大獅子吼 annotations to 雜阿含 cards using the same existing /agama/sub/<number>.html route pattern.
- Chinese canon links are labeled 漢譯經文, annotations 註解導讀. Pali originals, modern Chinese/English translations and Chinese treatises retain distinct correct labels. No unrelated 七覺支／第713經 entry was added merely because it appears in the sample screenshot.
- Scripture quotations, local source IDs, reader files and illustrations remain unchanged. Outbound provider retrieval may be blocked by network policy; syntactic link consistency and live local publication checks do not establish external-site availability.

## 2026-11-14 — Complete Āgama annotations and Chinese SN 22.48
- Corrected the earlier incomplete discovery: 台大獅子吼 covers all four Āgamas. Added the author's exact 增壹阿含 25.html and 中阿含象跡喻經 section URLs to Four Noble Truths source cards, preserving existing primary texts.
- Located SN 22.48 Chinese text independently in SuttaCentral's authoritative sc-data repository (`html_text/zh/pli/sutta/sn/sn22/sn22.48.html`, author 莊春江), after direct provider access returned 403. Added Chinese-first access, explicit translator/language, and a faithful excerpt with Pali comparison from bilara-data root segment sn22.48:2.2. Kept existing English/Pali links.
- Aligned the Bahiya source card with the same grouped actions and explicit Chinese translator. Moved its existing separate Pali link into the group without changing its destination or quotations.
- Added durable research instructions in AGENTS.md and sources in docs/SOURCES.md. Direct external website/anchor retrieval remains unverified where blocked; database content verification is not described as a successful provider-site visit.
