"""Build the preview's pages from the unchanged handoff and verified excerpts.

Run from any directory: python scripts/build-eightfold-path.py
There is one page per original subtitle; source timing is approximate, not playback.
"""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / 'docs/eightfold-path'


def load(name):
    return json.loads((HANDOFF / name).read_text())


story = load('storyboard.json')
manifest = load('assets-manifest.json')
sources = {row['id']: row for row in load('verified-sources.json')}
assert len(manifest) == 11
for row in manifest:
    data = (HANDOFF / row['path']).read_bytes()
    assert len(data) == row['bytes']
    assert hashlib.sha256(data).hexdigest() == row['sha256']
assert len(story['scenes']) == 13
assert sum(len(s['subtitles']) for s in story['scenes']) == 110
assert story['scenes'][2]['asset'] == 'assets/03-right-intention.webp'

# Scripture is paired by subject, not by unverified frame-level video timing.
# Each entry starts at that zero-based subtitle and holds until the next entry.
PAIRINGS = {
    1: [],
    2: [(0, 'sa748', None), (1, 'sa784', 'view'), (5, 'sa785', 'view')],
    3: [(0, 'sa784', 'intention'), (3, 'sa241', 'eyes'), (5, 'sa784', 'intention')],
    4: [(0, 'ma42', 'remorse')],
    5: [(0, 'sa749', None), (2, 'sa784', 'speech'), (4, 'sa1039', 'speech')],
    6: [(0, 'sa1039', 'life'), (4, 'ma42', 'remorse'), (5, 'ma16', None), (7, 'ma42', 'remorse')],
    7: [(0, 'sa784', 'action')],
    8: [(0, 'sa784', 'livelihood')],
    9: [(0, 'sa784', 'effort'), (4, 'sa785', 'effort'), (7, 'sa777', None)],
    10: [(0, 'sa784', 'mindfulness'), (2, 'sa785', 'mindfulness')],
    11: [(0, 'sa784', 'concentration'), (7, 'ma42', 'concentration')],
    12: [(0, 'ma200', None)],
    13: [(0, 'sa771', None)],
}
# Original quad illustrations are never cropped or altered.
PANELS = {4: ['tl', 'tl', 'tr', 'bl'] + ['br'] * 6,
          5: ['tl'] * 8,
          6: ['tr', 'tr', 'bl', 'bl'] + ['br'] * 4}
dimensions = {m['path']: [m['width'], m['height']] for m in manifest}
pages = []
scenes = []
for scene in story['scenes']:
    number = scene['scene']
    scenes.append({'id': number, 'title': scene['title'], 'start': len(pages),
                   'presentation': scene.get('presentation', {'overlays': []})})
    for index, subtitle in enumerate(scene['subtitles']):
        entry = {'scene': number, 'subtitle': index + 1,
                 'title': scene['title'], 'timeApprox': subtitle['timeApprox'],
                 'lines': [subtitle['text']],
                 'image': '../../docs/eightfold-path/' + scene['asset'] if scene['asset'] else None,
                 'dimensions': dimensions.get(scene['asset']),
                 'focusPanel': PANELS.get(number, [None] * len(scene['subtitles']))[index],
                 'verse': '', 'verseLabel': '', 'source': None}
        for start, source_id, passage in PAIRINGS[number]:
            if index >= start:
                record = sources[source_id]
                entry.update(verse=record['passages'][passage] if passage else record['excerpt'],
                             verseLabel=record['title'] + '（節錄）', source='../#' + source_id)
        pages.append(entry)
assert len(pages) == 110
assert next(p for p in pages if p['scene'] == 8 and p['subtitle'] == 9)['lines'] == [
    '只有行囊是輕盈且乾淨的，我們才能在前往彼岸的風浪中，保持平衡，不會沉沒。']
book = {'title': story['title'], 'scenes': scenes, 'pages': pages,
        'summary': [
            ['正見', '不邪見'], ['正志', '不貪欲、不瞋恚'],
            ['正語', '不妄語、不兩舌、不惡口、不綺語'],
            ['正業', '不殺生、不偷盜、不邪淫'],
            ['正命', '如法謀生，落實身、口、意的善行'],
            ['正方便、正念、正定', '支持善行與解脫的修習；非額外三項十善']
        ]}
(ROOT / 'eightfold-path/book/book-data.js').write_text(
    'const BOOK = ' + json.dumps(book, ensure_ascii=False, indent=2) + ';\n')
print('Verified 11 artwork hashes; built 110 pages / 13 scenes with original subtitles.')
