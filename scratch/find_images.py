import urllib.request
import urllib.parse
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def search_unsplash(query):
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=8"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('results', [])
            print(f"=== Query: {query} ({len(results)} found) ===")
            for r in results[:4]:
                raw = r['urls']['raw']
                desc = r.get('description') or r.get('alt_description') or 'No description'
                w, h = r['width'], r['height']
                print(f"ID: {r['id']}, Dimensions: {w}x{h}")
                print(f"Desc: {desc}")
                print(f"Raw: {raw}")
                print("-" * 50)
    except Exception as e:
        print(f"Error searching {query}: {e}")

queries = [
    "oil refinery piping",
    "petrochemical plant refinery",
    "power plant turbine generation",
    "water treatment plant industrial",
    "industrial construction structural steel"
]

for q in queries:
    search_unsplash(q)
