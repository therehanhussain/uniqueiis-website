import urllib.request
import urllib.parse
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
headers = {'User-Agent': 'UniqueIIS/1.0 (info@uniqueiis.com)'}

def search(q):
    params = {
        'action': 'query',
        'list': 'search',
        'srsearch': q,
        'srnamespace': 6,
        'srlimit': 6,
        'format': 'json'
    }
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        d = json.loads(resp.read().decode())
        titles = '|'.join([r['title'] for r in d.get('query', {}).get('search', [])])
    if not titles: return
    info_params = {'action': 'query', 'titles': titles, 'prop': 'imageinfo', 'iiprop': 'url|size|mime', 'format': 'json'}
    info_url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(info_params)
    info_req = urllib.request.Request(info_url, headers=headers)
    with urllib.request.urlopen(info_req) as resp:
        d = json.loads(resp.read().decode())
        for pid, p in d.get('query', {}).get('pages', {}).items():
            info = p.get('imageinfo', [{}])[0]
            if info.get('width', 0) >= 3000:
                print(p.get('title'), info.get('width'), 'x', info.get('height'), '->', info.get('url'))

print("=== Industrial Construction Candidates ===")
search('"industrial plant" construction crane')
search('refinery construction steel')
search('power plant construction crane')
