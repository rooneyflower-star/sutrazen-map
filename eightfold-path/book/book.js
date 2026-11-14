// Navigation and layout follow the current Twelve Links reader.
const pages = BOOK.pages;
const $ = selector => document.querySelector(selector);
const page = $('.page'), title = $('#page-title'), art = $('#art'), artFrame = $('#art-frame');
const verse = $('#verse'), sourceLink = $('#source-link'), select = $('#page-select');
const previous = $('#previous'), next = $('#next'), verseDialog = $('#verse-dialog');
const storageKey = 'sutrazen-eightfold-path-page';
const sceneStarts = new Map(BOOK.scenes.map(scene => [scene.id, scene.start]));
let current = 0;

function showPage(index) {
  const item = pages[index];
  if (!item) return;
  current = index;
  try { sessionStorage.setItem(storageKey, String(index)); } catch {}
  title.textContent = item.title;
  $('#narration').replaceChildren(...item.lines.map(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  }));
  renderImageOverlays(item);
  artFrame.hidden = !item.image;
  page.classList.toggle('text-scene', !item.image);
  if (item.image) {
    if (art.getAttribute('src') !== item.image) art.src = item.image;
    art.alt = item.title + (item.focusPanel ? '，目前閱讀' + {
      tl: '左上格', tr: '右上格', bl: '左下格', br: '右下格'
    }[item.focusPanel] : '，原始插畫');
    artFrame.style.setProperty('--art-ratio', item.dimensions.join(' / '));
    artFrame.style.setProperty('--art-ratio-number', String(item.dimensions[0] / item.dimensions[1]));
  }
  $('#panel-mask').hidden = !item.focusPanel;
  for (const panel of $('#panel-mask').children) {
    panel.classList.toggle('active', panel.dataset.panel === item.focusPanel);
  }
  verse.textContent = item.verse ? item.verseLabel + '\n' + item.verse : '';
  $('.scripture').hidden = !item.verse;
  $('.verse-body').scrollTop = 0;
  sourceLink.hidden = !item.source;
  if (item.source) sourceLink.setAttribute('href', item.source);
  else sourceLink.removeAttribute('href');
  $('#open-verse').hidden = !item.image || !item.verse;
  $('#summary').hidden = item.scene !== 13;
  previous.disabled = index === 0;
  next.disabled = index === pages.length - 1;
  select.value = String(item.scene);
  $('#position-text').textContent = `${index + 1} / ${pages.length} 頁`;
  // A long text chapter must start at its top on both orientations.
  $('.scene').scrollTop = 0;
  if (window.scrollY) window.scrollTo(0, 0);
  const upcoming = pages.slice(index + 1).find(p => p.image && p.image !== item.image);
  if (upcoming) new Image().src = upcoming.image;
  layoutArtwork();
}

let measuredScene = null;
function renderImageOverlays(item) {
  const plan = BOOK.scenes.find(scene => scene.id === item.scene).presentation;
  const active = (plan.overlays || []).filter(overlay =>
    item.subtitle >= (overlay.fromSubtitle || 1) && item.subtitle <= (overlay.throughSubtitle || Infinity));
  page.classList.toggle('overlay-scene', Boolean(item.image && active.length));
  $('#art-overlays').replaceChildren(...active.map(overlay => {
    const element = document.createElement('div');
    element.className = 'art-overlay';
    element.dataset.overlayId = overlay.id;
    element.dataset.backdrop = overlay.backdrop || 'none';
    element.dataset.nowrap = String(Boolean(overlay.nowrap));
    const variants = [['', overlay], ['portrait-', {...overlay, ...overlay.portrait}]];
    for (const [prefix, variant] of variants) {
      for (const key of ['x', 'y', 'width']) element.style.setProperty(`--${prefix}${key}`, variant[key] + '%');
      element.style.setProperty(`--${prefix}align`, variant.align || 'left');
      element.style.setProperty(`--${prefix}font`, `clamp(${variant.minFontPx}px, ${variant.fontSizeCqw}cqw, ${variant.maxFontPx}px)`);
    }
    element.style.lineHeight = overlay.lineHeight || 1.35;
    element.append(...overlay.lines.map(text => {
      const paragraph = document.createElement('p'); paragraph.textContent = text; return paragraph;
    }));
    return element;
  }));
  if (measuredScene !== item.scene) {
    measuredScene = item.scene;
    $('#caption-sizer').replaceChildren(...pages.filter(p => p.scene === item.scene).map(p => {
      const wrapper = document.createElement('div');
      wrapper.append(...p.lines.map(text => {const paragraph = document.createElement('p'); paragraph.textContent = text; return paragraph;}));
      return wrapper;
    }));
  }
}
function layoutArtwork() {
  if (!page.classList.contains('overlay-scene')) return;
  const scene = $('.scene');
  const captionHeight = $('#caption-sizer').getBoundingClientRect().height;
  const scriptureHeight = $('.scripture').hidden ? 0 : $('.scripture').getBoundingClientRect().height;
  scene.style.setProperty('--caption-space', captionHeight + 'px');
  scene.style.setProperty('--scripture-space', scriptureHeight + 'px');
  scene.style.setProperty('--image-space-height', Math.max(1, scene.clientHeight - captionHeight - scriptureHeight) + 'px');
}
new ResizeObserver(layoutArtwork).observe($('#caption-sizer'));
window.addEventListener('resize', layoutArtwork);
document.fonts.ready.then(layoutArtwork);

const table = document.createElement('table');
const head = table.createTHead().insertRow();
for (const label of ['八正道', '十善業道與修習的關係']) {
  const cell = document.createElement('th');
  cell.scope = 'col'; cell.textContent = label; head.append(cell);
}
const body = table.createTBody();
for (const row of BOOK.summary) {
  const tr = body.insertRow();
  for (const text of row) tr.insertCell().textContent = text;
}
const explanation = document.createElement('p');
explanation.textContent = '十善是身三、口四、意三的善行。這份對照說明彼此關聯，八正道與十善並非逐項等同。';
$('#summary').append(table, explanation);
for (const scene of BOOK.scenes) {
  select.add(new Option(`${String(scene.id).padStart(2, '0')} · ${scene.title}`, scene.id));
}
$('.controls').hidden = false;
$('#hint').hidden = false;
let saved = 0;
try { saved = Number(sessionStorage.getItem(storageKey) || 0); } catch {}
showPage(Number.isInteger(saved) && pages[saved] ? saved : 0);

previous.onclick = () => showPage(current - 1);
next.onclick = () => showPage(current + 1);
select.onchange = () => showPage(sceneStarts.get(Number(select.value)));
$('#open-verse').onclick = () => {
  $('#dialog-verse').textContent = verse.textContent;
  $('#dialog-source').hidden = sourceLink.hidden;
  if (!sourceLink.hidden) $('#dialog-source').setAttribute('href', sourceLink.getAttribute('href'));
  verseDialog.showModal();
  $('.verse-scroll').scrollTop = 0;
};
const readingText = 'select,input,textarea,.verse-body,.verse-scroll,#summary';
document.addEventListener('keydown', event => {
  if (verseDialog.open || event.target.closest(readingText) ||
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPage(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchStart;
page.addEventListener('touchstart', event => {
  // Selecting text and scrolling scripture must never turn the page.
  if (event.touches.length !== 1 || event.target.closest('a,' + readingText)) {
    touchStart = null; return;
  }
  touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
}, { passive: true });
page.addEventListener('touchcancel', () => { touchStart = null; });
page.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  touchStart = null;
  if (window.getSelection()?.toString()) return;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    showPage(current + (dx < 0 ? 1 : -1));
  }
}, { passive: true });
matchMedia('(orientation:portrait)').addEventListener('change', event => {
  if (event.matches && verseDialog.open) verseDialog.close();
});
