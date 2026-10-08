import os
from PIL import Image

src_dir = r'scratch/optimized'
dest_dir = r'public/images/uiis/industries'
os.makedirs(dest_dir, exist_ok=True)

# Selection of the 5 highest-quality authentic industrial images:
# 1. Oil & Gas: oil_and_gas_2_opt.jpg (5444x3689 source, resized to 2800px width at quality 94)
# 2. Petrochemical: petrochemical_1_opt.jpg (5472x3648 source, resized to 2800px width at quality 94)
# 3. Power & Utilities: power_2_opt.jpg (4320x3240 source, resized to 2800px width at quality 94)
# 4. Water & Infrastructure: water_1_opt.jpg (4608x3456 source, resized to 2800px width at quality 94)
# 5. Industrial & Construction: construction_1_opt.jpg (4032x3024 source, resized to 2800px width at quality 94)

mapping = {
    'oil_and_gas.jpg': 'oil_and_gas_2_opt.jpg',
    'petrochemical.jpg': 'petrochemical_1_opt.jpg',
    'power_utilities.jpg': 'power_2_opt.jpg',
    'water_infrastructure.jpg': 'water_1_opt.jpg',
    'industrial_construction.jpg': 'construction_1_opt.jpg',
}

for dest_name, src_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    
    with Image.open(src_path) as img:
        rgb = img.convert('RGB')
        w, h = rgb.size
        # Save high quality JPEG with optimization
        rgb.save(dest_path, 'JPEG', quality=94, optimize=True)
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"Saved {dest_name}: {w}x{h}, {size_kb:.1f} KB")

print("All 5 industry images successfully replaced with 2800px ultra-high-resolution photography!")
