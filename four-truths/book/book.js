const pages = [];
const sceneStarts = scenes.map((scene, sceneIndex) => {
  const start = pages.length;
  let lines = [];
  for (const subtitle of scene.subtitles) {
    if (lines.length && (lines.length === 2 || lines.join('').length + subtitle.length > 64)) {
      pages.push({ sceneIndex, lines });
      lines = [];
    }
    lines.push(subtitle);
  }
  pages.push({ sceneIndex, lines });
  return start;
});

const page = document.querySelector('.page');
const title = document.getElementById('page-title');
const scenePanel = title.parentElement;
const caption = document.getElementById('caption');
const art = document.getElementById('art');
const artFrame = document.getElementById('art-frame');
const artLabel = document.getElementById('art-label');
const sourceLink = document.getElementById('source-link');
const verse = document.getElementById('verse');
const verseBody = verse.parentElement;
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const select = document.getElementById('page-select');
const positionText = document.getElementById('position-text');
const openVerse = document.getElementById('open-verse');
const verseDialog = document.getElementById('verse-dialog');
const dialogVerse = document.getElementById('dialog-verse');
const dialogSource = document.getElementById('dialog-source');
const landscape = matchMedia('(orientation: landscape)');

const warmed = new Set();
let current = 0;

function makeCaptionLine(line) {
  const paragraph = document.createElement('p');
  paragraph.textContent = line;
  return paragraph;
}

function showPage(index) {
  const entry = pages[index];
  if (!entry) return;
  const scene = scenes[entry.sceneIndex];
  current = index;
  if (history.state?.bookPage !== index) {
    history.replaceState({ ...history.state, bookPage: index }, '');
  }
  title.textContent = scene.title;
  caption.hidden = entry.lines.length === 0;
  const isHeart = Boolean(scene.highlight);
  if (isHeart) {
    const variants = pages.filter(candidate => candidate.sceneIndex === entry.sceneIndex);
    caption.replaceChildren(...variants.map(variant => {
      const copy = document.createElement('div');
      copy.append(...variant.lines.map(makeCaptionLine));
      if (variant !== entry) {
        copy.className = 'caption-sizer';
        copy.setAttribute('aria-hidden', 'true');
      }
      return copy;
    }));
  } else {
    caption.replaceChildren(...entry.lines.map(makeCaptionLine));
  }
  artFrame.hidden = !scene.image;
  artFrame.dataset.scene = scene.image?.split('.')[0] ?? '';
  artLabel.hidden = !scene.artLabel;
  artLabel.textContent = scene.artLabel ?? '';
  if (scene.image) {
    const image = 'images/' + scene.image;
    art.alt = scene.alt;
    if (art.getAttribute('src') !== image) art.src = image;
  }
  page.classList.toggle('text-scene', !scene.image);
  page.classList.toggle('heart-scene', isHeart);
  if (isHeart) {
    if (title.parentElement !== verseBody) verseBody.prepend(title);
    verseBody.setAttribute('tabindex', '0');
    verseBody.setAttribute('role', 'region');
    verseBody.setAttribute('aria-label', '心經直書，從右往左讀，可橫向捲動');
  } else {
    if (title.parentElement !== scenePanel) scenePanel.prepend(title);
    verseBody.removeAttribute('tabindex');
    verseBody.removeAttribute('role');
    verseBody.removeAttribute('aria-label');
  }
  page.classList.toggle('labeled-scene', Boolean(scene.artLabel));
  page.classList.toggle('document-scene', entry.sceneIndex >= 8);
  if (verse.textContent !== scene.verse) {
    verse.textContent = scene.verse;
    if (scene.highlight) {
      const offset = scene.verse.indexOf(scene.highlight);
      const emphasis = document.createElement('strong');
      emphasis.className = 'verse-highlight';
      emphasis.textContent = scene.highlight;
      verse.replaceChildren(scene.verse.slice(0, offset), emphasis, scene.verse.slice(offset + scene.highlight.length));
    }
  }
  sourceLink.hidden = !scene.source;
  if (scene.source) sourceLink.href = scene.source;
  openVerse.hidden = !scene.image;
  previous.disabled = index === 0;
  next.disabled = index === pages.length - 1;
  select.value = String(entry.sceneIndex);
  positionText.textContent = (index + 1) + ' / ' + pages.length + ' 頁';
  if (window.scrollY) window.scrollTo(0, 0);

  const upcoming = scenes[entry.sceneIndex + 1]?.image;
  if (upcoming && !warmed.has(upcoming)) {
    warmed.add(upcoming);
    new Image().src = 'images/' + upcoming;
  }
}

scenes.forEach((scene, index) => {
  select.add(new Option((index + 1) + ' 幕 · ' + scene.title, index));
});
document.querySelector('.controls').hidden = false;
document.getElementById('hint').hidden = false;
showPage(pages[history.state?.bookPage] ? history.state.bookPage : 0);

previous.addEventListener('click', () => showPage(current - 1));
next.addEventListener('click', () => showPage(current + 1));
select.addEventListener('change', () => showPage(sceneStarts[Number(select.value)]));
openVerse.addEventListener('click', () => {
  dialogVerse.textContent = verse.textContent;
  dialogSource.hidden = sourceLink.hidden;
  if (!sourceLink.hidden) dialogSource.href = sourceLink.href;
  verseDialog.showModal();
  verseDialog.querySelector('.verse-scroll').scrollTop = 0;
});
landscape.addEventListener('change', event => {
  if (!event.matches && verseDialog.open) verseDialog.close();
});

document.addEventListener('keydown', event => {
  if (verseDialog.open || event.target === verseBody || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target === select) return;
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
  event.preventDefault();
  showPage(current + (event.key === 'ArrowRight' ? 1 : -1));
});

let touchStart;
page.addEventListener('touchstart', event => {
  if (event.touches.length !== 1 || event.target.closest('a, summary, .heart-scene .verse-body')) {
    touchStart = undefined;
    return;
  }
  const { clientX, clientY } = event.touches[0];
  touchStart = { x: clientX, y: clientY };
}, { passive: true });
page.addEventListener('touchcancel', () => { touchStart = undefined; });
page.addEventListener('touchend', event => {
  if (!touchStart) return;
  const { clientX, clientY } = event.changedTouches[0];
  const dx = clientX - touchStart.x;
  const dy = clientY - touchStart.y;
  touchStart = undefined;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    showPage(current + (dx < 0 ? 1 : -1));
  }
}, { passive: true });
