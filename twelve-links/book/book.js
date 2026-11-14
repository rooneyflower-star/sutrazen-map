const pages=BOOK.pages,scenes=BOOK.scenes;
const $=s=>document.querySelector(s),page=$('.page'),title=$('#page-title'),scenePanel=title.parentElement,caption=$('#caption'),art=$('#art'),artFrame=$('#art-frame'),sourceLink=$('#source-link'),verse=$('#verse'),verseBody=verse.parentElement,previous=$('#previous'),next=$('#next'),select=$('#page-select'),positionText=$('#position-text'),openVerse=$('#open-verse'),verseDialog=$('#verse-dialog'),dialogVerse=$('#dialog-verse'),dialogSource=$('#dialog-source');
let current=0;
const sceneStarts=new Map();pages.forEach((p,i)=>{if(!sceneStarts.has(p.scene))sceneStarts.set(p.scene,i);});
function line(t){const p=document.createElement('p');p.textContent=t;return p;}
function showPage(index){const p=pages[index];if(!p)return;current=index;try{sessionStorage.setItem('sutrazen-twelve-links-page',String(index));}catch{}title.textContent=p.heart?'般若波羅蜜多心經':p.title;caption.hidden=!p.lines.length;
 if(p.heart){caption.replaceChildren(...pages.filter(x=>x.heart).map(x=>{const d=document.createElement('div');d.append(...x.lines.map(line));if(x!==p){d.className='caption-sizer';d.setAttribute('aria-hidden','true');}return d;}));}else caption.replaceChildren(...p.lines.map(line));
 caption.classList.toggle('white-caption',[5,9,11].includes(p.scene));artFrame.hidden=!p.image;page.classList.toggle('text-scene',!p.image);page.classList.toggle('heart-scene',p.heart);page.classList.toggle('document-scene',p.scene===1);page.classList.toggle('labeled-scene',p.labels?.length>0);
 if(p.image){if(art.getAttribute('src')!==p.image){artFrame.style.opacity='0';art.onload=()=>artFrame.style.opacity='1';art.src=p.image;}art.alt=p.title+'，使用者提供原圖。';}
 $('#left-mask').hidden=p.mask!=='left';$('#art-labels').replaceChildren(...(p.labels||[]).map(([t,x,y,color])=>{const s=document.createElement('span');s.textContent=t;s.style.left=x+'%';s.style.top=y+'%';s.className=color;return s;}));
 if(p.heart){verseBody.prepend(title);verseBody.setAttribute('tabindex','0');verseBody.setAttribute('role','region');verseBody.setAttribute('aria-label','心經直書，從右往左讀，可橫向捲動');}else{scenePanel.prepend(title);verseBody.removeAttribute('tabindex');verseBody.removeAttribute('role');verseBody.removeAttribute('aria-label');}
 const text=(p.number?`《雜阿含經》第${p.number}經\n`:'')+p.verse;verse.textContent=text;
 if(p.heart){const start=text.indexOf(BOOK.heartHighlight),strong=document.createElement('strong');strong.className='verse-highlight';strong.textContent=BOOK.heartHighlight;verse.replaceChildren(text.slice(0,start),strong,text.slice(start+BOOK.heartHighlight.length));}
 sourceLink.hidden=!p.number&&!p.heart;sourceLink.href=p.number?'../#sa'+p.number:'https://cbetaonline.dila.edu.tw/zh/T0251';openVerse.hidden=!p.image;previous.disabled=index===0;next.disabled=index===pages.length-1;select.value=String(p.scene);positionText.textContent=`${index+1} / ${pages.length} 頁`;if(window.scrollY)window.scrollTo(0,0);
 const np=pages.slice(index+1).find(x=>x.image&&x.image!==p.image);if(np)new Image().src=np.image;
}
for(const [id,start] of sceneStarts){select.add(new Option((id<19?`${String(id).padStart(2,'0')} · `:'')+pages[start].title,id));}
$('.controls').hidden=false;$('#hint').hidden=false;let saved=0;try{saved=Number(sessionStorage.getItem('sutrazen-twelve-links-page')||0);}catch{}showPage(pages[saved]?saved:0);
previous.onclick=()=>showPage(current-1);next.onclick=()=>showPage(current+1);select.onchange=()=>showPage(sceneStarts.get(Number(select.value)));openVerse.onclick=()=>{dialogVerse.textContent=verse.textContent;dialogSource.hidden=sourceLink.hidden;dialogSource.setAttribute('href',sourceLink.getAttribute('href'));verseDialog.showModal();$('.verse-scroll').scrollTop=0;};
document.addEventListener('keydown',e=>{if(verseDialog.open||e.target.closest('select,input,textarea,.heart-scene .verse-body')||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showPage(current+(e.key==='ArrowRight'?1:-1));}});
let touchStart;page.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('a,.heart-scene .verse-body')){touchStart=null;return;}touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});page.addEventListener('touchcancel',()=>touchStart=null);page.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)showPage(current+(dx<0?1:-1));},{passive:true});
matchMedia('(orientation:portrait)').addEventListener('change',e=>{if(e.matches&&verseDialog.open)verseDialog.close();});
document.addEventListener('click', e => {
 const anchor = e.target.closest('a');
 if (!anchor || window.parent === window) return;
 const raw = anchor.getAttribute('href');
 if (!raw || !raw.startsWith('../')) return;
 e.preventDefault();
 const fragment = raw.includes('#') ? raw.split('#')[1] : 'guide';
 const hash = /^sa\d+$/.test(fragment) ? 'sources-' + fragment : fragment;
 window.parent.postMessage({type:'sutrazen-route',hash}, location.origin === 'null' ? '*' : location.origin);
});
