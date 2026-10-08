import sys
import urllib.request
import urllib.parse
import json

sys.stdout.reconfigure(encoding='utf-8')
headers = {'User-Agent': 'UniqueIIS/1.0 (info@uniqueiis.com)'}

def search_media(query, limit=8):
    params = {'action': 'query', 'list': 'search', 'srsearch': query, 'srnamespace': 6, 'srlimit': limit, 'format': 'json'}
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        search_results = data.get('query', {}).get('search', [])
    titles = '|'.join([r['title'] for r in search_results])
    if not titles: return
    info_params = {'action': 'query', 'titles': titles, 'prop': 'imageinfo', 'iiprop': 'url|size|mime', 'format': 'json'}
    info_url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(info_params)
    info_req = urllib.request.Request(info_url, headers=headers)
    with urllib.request.urlopen(info_req) as resp:
        info_data = json.loads(resp.read().decode('utf-8'))
        pages = info_data.get('query', {}).get('pages', {})
        print(f"\n=== {query} ===")
        for pid, page in pages.items():
            info = page.get('imageinfo', [{}])[0]
            w, h, mime, url = info.get('width', 0), info.get('height', 0), info.get('mime', ''), info.get('url', '')
            if mime in ['image/jpeg', 'image/png'] and w >= 2500 and h >= 1500:
                print(f"{page.get('title')} ({w}x{h}) -> {url}")

search_media('ironworkers structural steel')
search_media('steel erection construction workers')
search_media('refinery distillation columns pipes')
