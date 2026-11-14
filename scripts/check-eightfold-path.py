"""Integrity and browser checks for the Eightfold Path preview.

Requires Pillow, lxml, Playwright and Chromium. Serve repository's parent with
python -m http.server 8011 --directory /workspace
then run: python scripts/check-eightfold-path.py
Use SUTRAZEN_TEST_URL / SUTRAZEN_TEST_ARTIFACTS to override defaults.
"""
import hashlib
import json
import os
import subprocess
from pathlib import Path
from urllib.parse import unquote, urlsplit

from lxml import html
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = os.environ.get('SUTRAZEN_TEST_URL', 'http://127.0.0.1:8011/sutrazen-map/')
OUT = Path(os.environ.get('SUTRAZEN_TEST_ARTIFACTS', '/tmp/eightfold-test-results'))
OUT.mkdir(parents=True, exist_ok=True)
handoff = ROOT / 'docs/eightfold-path'
story = json.loads((handoff / 'storyboard.json').read_text())
manifest = json.loads((handoff / 'assets-manifest.json').read_text())
data = json.loads((ROOT / 'eightfold-path/book/book-data.js').read_text().removeprefix('const BOOK = ').strip().removesuffix(';'))
assert len(manifest) == 11
for row in manifest:
    image = handoff / row['path']
    assert hashlib.sha256(image.read_bytes()).hexdigest() == row['sha256']
    assert image.stat().st_size == row['bytes']
    assert Image.open(image).size == (row['width'], row['height'])
assert len(story['scenes']) == len(data['scenes']) == 13
assert [p['lines'][0] for p in data['pages']] == [s['text'] for scene in story['scenes'] for s in scene['subtitles']]
assert len(data['pages']) == 110
for path in ['README.md', 'storyboard.md', 'storyboard.json', 'assets-manifest.json']:
    original = subprocess.check_output(['git', 'show', 'e121f3c1f78535243ffbf75599a7f4e1e272e0fa:docs/eightfold-path/' + path], cwd=ROOT)
    assert original == (handoff / path).read_bytes()
for path in (ROOT / 'eightfold-path').rglob('*'):
    if path.is_file():
        assert 'data:image' not in path.read_text()

def check_target(document, target):
    url = urlsplit(target)
    if url.scheme or url.netloc or not target:
        return
    resolved = (document.parent / unquote(url.path)).resolve() if url.path else document
    if resolved.is_dir():
        resolved /= 'index.html'
    assert resolved.is_file(), (document, target)
    if url.fragment:
        tree = html.fromstring(resolved.read_bytes())
        assert tree.xpath('//*[@id=$anchor]', anchor=unquote(url.fragment)), (document, target)

for path in [ROOT / 'eightfold-path/index.html', ROOT / 'eightfold-path/book/index.html']:
    tree = html.fromstring(path.read_bytes())
    ids = tree.xpath('//@id')
    assert len(ids) == len(set(ids))
    for target in tree.xpath('//@src | //@href'):
        check_target(path, target)
for item in data['pages']:
    for field in ['image', 'source']:
        if item[field]:
            check_target(ROOT / 'eightfold-path/book/index.html', item[field])

baseline = subprocess.check_output(['git', 'merge-base', 'HEAD', 'origin/main'], cwd=ROOT, text=True).strip()
old_home = subprocess.check_output(['git', 'show', baseline + ':index.html'], cwd=ROOT, text=True)
new_home = (ROOT / 'index.html').read_text()
old_tree, new_tree = html.fromstring(old_home), html.fromstring(new_home)
assert old_tree.xpath('//iframe/@src') == new_tree.xpath('//iframe/@src')
assert old_tree.xpath('//*[contains(@class,"sz-book-title")]/text()') == new_tree.xpath('//*[contains(@class,"sz-book-title")]/text()')
assert html.tostring(old_tree.xpath('//main')[0]) == html.tostring(new_tree.xpath('//main')[0])
def map_data(text):
    return json.loads(text.split('const dhammaData = ', 1)[1].split(';', 1)[0])
old_map, new_map = map_data(old_home), map_data(new_home)
assert old_map.keys() == new_map.keys()
for key in old_map:
    if key != '八正道總說':
        assert old_map[key] == new_map[key]
assert new_map['八正道總說']['content'].startswith(old_map['八正道總說']['content'].removesuffix('</div>'))
for name in ['four-truths', 'five-aggregates', 'six-senses', 'twelve-links']:
    files = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', baseline, name], cwd=ROOT, text=True).splitlines()
    for path in files:
        assert (ROOT / path).read_bytes() == subprocess.check_output(['git', 'show', baseline + ':' + path], cwd=ROOT), path
print('PASS integrity: 11 artwork hashes/sizes; 13 scenes/110 exact captions; original handoff and four books unchanged; local links; no embedded images', flush=True)

def swipe(locator, dx=-140, dy=0):
    locator.evaluate('''(element, delta) => {
      element.dispatchEvent(new TouchEvent('touchstart', {bubbles:true,
        touches:[new Touch({identifier:0,target:element,clientX:220,clientY:100})]}));
      element.dispatchEvent(new TouchEvent('touchend', {bubbles:true,
        changedTouches:[new Touch({identifier:0,target:element,clientX:220+delta[0],clientY:100+delta[1]})]}));
    }''', [dx, dy])

results = []
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for width, height in [(390, 844), (844, 390), (768, 1024), (1024, 768)]:
        g = browser.new_page(viewport={'width': width, 'height': height}, has_touch=True)
        errors = []
        g.on('pageerror', lambda error: errors.append(str(error)))
        g.goto(BASE_URL + 'eightfold-path/book/', wait_until='domcontentloaded')
        assert g.locator('#previous').is_disabled()
        for index, item in enumerate(data['pages']):
            if index:
                g.locator('#next').click()
            assert g.locator('#position-text').inner_text() == f'{index+1} / 110 頁'
            assert g.locator('#narration').inner_text() == item['lines'][0]
            expected_verse = item['verseLabel'] + '\n' + item['verse'] if item['verse'] else ''
            assert g.locator('#verse').text_content() == expected_verse
            if item['image']:
                g.wait_for_function('document.querySelector("#art").complete && document.querySelector("#art").naturalWidth > 0')
                assert g.locator('#art').get_attribute('src') == item['image']
                assert g.locator('#art').evaluate('(e) => [e.naturalWidth,e.naturalHeight]') == item['dimensions']
            else:
                assert g.locator('#art-frame').is_hidden()
                assert g.locator('#summary tbody tr').count() == 6
            if item['focusPanel']:
                assert g.locator('#panel-mask .active').count() == 1
                assert g.locator('#panel-mask .active').get_attribute('data-panel') == item['focusPanel']
                assert g.locator('#panel-mask span:not(.active)').count() == 3
                assert g.locator('#panel-mask .active').evaluate('(e)=>getComputedStyle(e).backgroundColor') == 'rgba(0, 0, 0, 0)'
                for panel in g.locator('#panel-mask span:not(.active)').all():
                    assert panel.evaluate('(e)=>getComputedStyle(e).backgroundColor') == 'rgba(5, 12, 20, 0.76)'
                frame = g.locator('#art-frame').bounding_box()
                assert abs(frame['width'] / frame['height'] - item['dimensions'][0] / item['dimensions'][1]) < .005
            else:
                assert g.locator('#panel-mask').is_hidden()
            assert g.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert g.locator('#next').is_disabled()
        g.locator('#page-select').select_option('3')
        assert g.locator('#art').get_attribute('src').endswith('03-right-intention.webp')
        g.locator('#next').click()
        before = g.evaluate('current')
        g.locator('#next').press('ArrowRight')
        assert g.evaluate('current') == before + 1
        swipe(g.locator('#art-frame'))
        assert g.evaluate('current') == before + 2
        swipe(g.locator('#art-frame'), dy=180)
        assert g.evaluate('current') == before + 2
        position = g.locator('#position-text').inner_text()
        g.set_viewport_size({'width': height, 'height': width})
        assert g.locator('#position-text').inner_text() == position
        g.set_viewport_size({'width': width, 'height': height})
        g.reload(wait_until='domcontentloaded')
        assert g.locator('#position-text').inner_text() == position

        g.locator('#page-select').select_option('4')
        before = g.evaluate('current')
        if width < height:
            region = g.locator('.verse-body')
            assert region.evaluate('(e)=>e.scrollHeight>e.clientHeight')
            region.evaluate('(e)=>e.scrollTop=80')
            assert region.evaluate('(e)=>e.scrollTop') > 0
            swipe(region)
            region.focus()
            region.press('ArrowRight')
            assert g.evaluate('current') == before
            g.locator('#source-link').click()
        else:
            g.locator('#open-verse').click()
            assert g.locator('#dialog-verse').text_content() == g.locator('#verse').text_content()
            region = g.locator('.verse-scroll')
            # A tablet sheet may fit the complete excerpt without needing scroll.
            if region.evaluate('(e)=>e.scrollHeight>e.clientHeight'):
                region.evaluate('(e)=>e.scrollTop=80')
                assert region.evaluate('(e)=>e.scrollTop') > 0
            swipe(region)
            g.keyboard.press('ArrowRight')
            assert g.evaluate('current') == before
            g.locator('#verse-dialog button').click()
            assert not g.locator('#verse-dialog').is_visible()
            g.locator('#open-verse').click()
            g.locator('#dialog-source').click()
        g.wait_for_url('**/eightfold-path/#ma42')
        assert g.locator('#ma42').is_visible()
        g.locator('.book-cover').click()
        assert g.locator('#position-text').inner_text() == f'{before+1} / 110 頁'
        assert g.locator('#narration').evaluate('(e)=>getComputedStyle(e).userSelect') != 'none'
        g.locator('#page-select').select_option('6')
        g.wait_for_function('document.querySelector("#art").complete')
        g.screenshot(path=str(OUT / f'quad-{width}.png'))
        g.locator('.top a').click()
        g.wait_for_url('**/eightfold-path/')
        assert g.locator('.guide-header a').count() == 1
        assert g.locator('.guide-header a').inner_text() == '回三十七道品修道地圖'
        assert g.locator('.guide-video iframe').get_attribute('src') == 'https://www.youtube.com/embed/wabgCGL-Cfk'
        assert g.locator('.source-entry').count() == 12
        assert g.locator('.source-actions a').count() == 24
        assert g.evaluate('document.documentElement.scrollWidth <= innerWidth')
        g.screenshot(path=str(OUT / f'guide-{width}.png'))
        assert not errors, errors
        results.append({'width': width, 'height': height, 'pages': 110, 'status': 'pass'})
        print(f'PASS {width}x{height}: 110 pages, images, 3-panel masks, buttons, keys, swipe, TOC, scripture scroll/dialog/source links, rotation and session retention, guide UI', flush=True)
        g.close()

    g = browser.new_page(viewport={'width': 1024, 'height': 768})
    # Shared map relies on the pre-existing external Tailwind/Lucide. In a blocked
    # environment use the exact previously compiled map CSS for local UI checks.
    css = Path('/workspace/sutrazen-map-preview/tailwind.css')
    lucide = Path('/workspace/sutrazen-map-preview/lucide.min.js')
    if css.exists():
        g.route('https://cdn.tailwindcss.com/', lambda route: route.fulfill(content_type='application/javascript', body='const s=document.createElement("style");s.textContent='+json.dumps(css.read_text())+';document.head.append(s);'))
    if lucide.exists():
        g.route('https://unpkg.com/lucide@latest', lambda route: route.fulfill(content_type='application/javascript', body=lucide.read_text()))
    g.goto(BASE_URL, wait_until='domcontentloaded')
    assert g.locator('.sz-books > li').count() == 14
    assert g.locator('.sz-books .sz-ready').count() == 5
    assert g.locator('.sz-book-lock').count() == 9
    fifth = g.locator('.sz-books > li').nth(4)
    assert fifth.locator('.sz-book').get_attribute('href') == './eightfold-path/book/'
    assert fifth.locator('.sz-book-links a').count() == 2
    fifth.locator('.sz-book-source').first.click()
    g.wait_for_url('**/eightfold-path/')
    g.goto(BASE_URL, wait_until='domcontentloaded')
    g.locator('button[onclick="openModal(\'八正道總說\')"]').click()
    g.locator('#modalBody a[href="./eightfold-path/"]').click()
    g.wait_for_url('**/eightfold-path/')
    for name in ['four-truths', 'five-aggregates', 'six-senses', 'twelve-links']:
        g.goto(BASE_URL, wait_until='domcontentloaded')
        g.locator(f'.sz-books a.sz-ready[href="./{name}/book/"]').click()
        g.wait_for_url('**/' + name + '/book/')
        # Older readers expose different data globals; check their actual UI.
        g.locator('#next').wait_for(state='visible')
        g.wait_for_function('/\\d/.test(document.querySelector("#position-text").textContent)')
        first = g.locator('#position-text').inner_text()
        g.locator('#next').click()
        assert g.locator('#position-text').inner_text() != first
        g.locator('.top a').click()
        g.wait_for_url(lambda url: urlsplit(url).path.endswith('/' + name + '/'), wait_until='domcontentloaded')
        assert g.locator('.guide-header a').count() == 1
    g.close()
    browser.close()
print('PASS shelf: 14 books / 5 readable / 9 locked; map dialog and all four existing reader/guide entries', flush=True)
(OUT / 'results.json').write_text(json.dumps({'baseline': baseline, 'viewports': results, 'regression': 'pass', 'realIPadSafari': 'not tested', 'externalYouTubePlayback': 'not tested'}, indent=2) + '\n')
