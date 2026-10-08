import os
import urllib.request
from PIL import Image

headers = {'User-Agent': 'UniqueIIS/1.0 (info@uniqueiis.com)'}

candidates = {
    'oil_and_gas_1': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Distillation_towers_Tulap2.jpg',
    'oil_and_gas_2': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Distillation_Towers_Tulap1.jpg',
    'petrochemical_1': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Bayway_Refinery_td_%282022-01-18%29_02.jpg',
    'petrochemical_2': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Bayway_Refinery_td_%282022-01-18%29_05.jpg',
    'power_1': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Centrale_termoelettrica_thermal_power_station_Turbigo_Italy.jpg',
    'power_2': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Stanton_Energy_Center_Cooling_Towers.jpg',
    'water_1': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Perth_Seawater_Desalination_Plant%2C_September_2020_02.jpg',
    'water_2': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Waste_Water_Treatment_Plant.jpg',
    'construction_1': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Ironworkers_fabricating_structural_steel_for_the_architectural_framing_by_47th_Street_in_the_future_LIRR_passenger_concourse._%2849434605136%29.jpg',
}

download_dir = r'scratch/candidates'
os.makedirs(download_dir, exist_ok=True)

for name, url in candidates.items():
    dest = os.path.join(download_dir, f'{name}.jpg')
    print(f"Downloading {name} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        with Image.open(dest) as img:
            print(f"-> SUCCESS: {name} {img.size}, {img.format}, {os.path.getsize(dest)/1024:.1f} KB")
    except Exception as e:
        print(f"-> ERROR {name}: {e}")
