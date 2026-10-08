import sys
import urllib.request
import urllib.parse
import json
import os

# Set stdout to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

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
        return []
        
    info_params = {
        'action': 'query',
        'titles': titles,
        'prop': 'imageinfo',
        'iiprop': 'url|size|mime',
        'format': 'json'
    }
    info_url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(info_params)
    info_req = urllib.request.Request(info_url, headers=headers)
    results = []
    with urllib.request.urlopen(info_req) as resp:
        info_data = json.loads(resp.read().decode('utf-8'))
        pages = info_data.get('query', {}).get('pages', {})
        for pid, page in pages.items():
            info = page.get('imageinfo', [{}])[0]
            w = info.get('width', 0)
            h = info.get('height', 0)
            mime = info.get('mime', '')
            url = info.get('url', '')
            if mime in ['image/jpeg', 'image/png'] and w >= 2500 and h >= 1500:
                results.append({
                    'title': page.get('title'),
                    'width': w,
                    'height': h,
                    'url': url
                })
    return results

print("=== PETROCHEMICAL SEARCH ===")
petro = search_media('petrochemical complex OR "chemical plant" refinery')
for p in petro[:6]:
    print(f"{p['title']} ({p['width']}x{p['height']}) -> {p['url']}")

print("\n=== INDUSTRIAL CONSTRUCTION SEARCH ===")
construct = search_media('structural steel construction site crane')
for c in construct[:6]:
    print(f"{c['title']} ({c['width']}x{c['height']}) -> {c['url']}")

print("\n=== POWER PLANT GENERATOR SEARCH ===")
power = search_media('"power station" cooling towers OR "gas turbine"')
for pw in power[:6]:
    print(f"{pw['title']} ({pw['width']}x{pw['height']}) -> {pw['url']}")

print("\n=== WATER TREATMENT SEARCH ===")
water = search_media('"water treatment plant" OR "seawater desalination plant"')
for w in water[:6]:
    print(f"{w['title']} ({w['width']}x{w['height']}) -> {w['url']}")
