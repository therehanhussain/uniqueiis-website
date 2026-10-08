import urllib.request
import urllib.parse
import json

headers = {'User-Agent': 'UniqueIIS/1.0 (info@uniqueiis.com)'}

def search_media(query, limit=12):
    params = {
        'action': 'query',
        'list': 'search',
        'srsearch': query,
        'srnamespace': 6,
        'srlimit': limit,
        'format': 'json'
    }
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        search_results = data.get('query', {}).get('search', [])
        
    titles = '|'.join([r['title'] for r in search_results])
    if not titles:
        print(f"No results for {query}")
        return
        
    info_params = {
        'action': 'query',
        'titles': titles,
        'prop': 'imageinfo',
        'iiprop': 'url|size|mime',
        'format': 'json'
    }
    info_url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(info_params)
    info_req = urllib.request.Request(info_url, headers=headers)
    with urllib.request.urlopen(info_req) as resp:
        info_data = json.loads(resp.read().decode('utf-8'))
        pages = info_data.get('query', {}).get('pages', {})
        print(f"\n==================== {query} ====================")
        for pid, page in pages.items():
            info = page.get('imageinfo', [{}])[0]
            w = info.get('width', 0)
            h = info.get('height', 0)
            mime = info.get('mime', '')
            url = info.get('url', '')
            if mime in ['image/jpeg', 'image/png', 'image/webp'] and w >= 2500 and h >= 1500:
                print(f"Title: {page.get('title')}")
                print(f"Dimensions: {w}x{h}")
                print(f"URL: {url}")
                print("-" * 30)

search_media('oil refinery distillation towers')
search_media('chemical plant refinery pipes')
search_media('thermal power station generator turbines')
search_media('desalination plant OR water treatment clarifier')
search_media('steel construction building site workers')
