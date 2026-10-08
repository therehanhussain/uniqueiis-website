import os
from PIL import Image

cand_dir = r'scratch/candidates'
out_dir = r'scratch/optimized'
os.makedirs(out_dir, exist_ok=True)

# Function to resize/crop while preserving aspect ratio and quality
def process_image(src_name, target_name, focal_y=0.5):
    src_path = os.path.join(cand_dir, src_name)
    with Image.open(src_path) as img:
        rgb = img.convert('RGB')
        w, h = rgb.size
        print(f"Processing {src_name} ({w}x{h})...")
        
        # Target aspect ratio for cards is approx 4:5 (e.g. 2400x3000) or keep wide 16:10 / 4:3 so object-cover works seamlessly
        # Let's save a high-res image with target width 2800px or keep original if close
        target_w = 2800
        if w > target_w:
            target_h = int(h * (target_w / w))
            resized = rgb.resize((target_w, target_h), Image.Resampling.LANCZOS)
        else:
            resized = rgb
            
        dest_path = os.path.join(out_dir, target_name)
        resized.save(dest_path, 'JPEG', quality=92, optimize=True)
        print(f"Saved {dest_path}: {resized.size}, {os.path.getsize(dest_path)/1024:.1f} KB")

process_image('oil_and_gas_1.jpg', 'oil_and_gas_1_opt.jpg')
process_image('oil_and_gas_2.jpg', 'oil_and_gas_2_opt.jpg')
process_image('petrochemical_1.jpg', 'petrochemical_1_opt.jpg')
process_image('petrochemical_2.jpg', 'petrochemical_2_opt.jpg')
process_image('power_1.jpg', 'power_1_opt.jpg')
process_image('power_2.jpg', 'power_2_opt.jpg')
process_image('water_1.jpg', 'water_1_opt.jpg')
process_image('water_2.jpg', 'water_2_opt.jpg')
process_image('construction_1.jpg', 'construction_1_opt.jpg')
process_image('construction_2.jpg', 'construction_2_opt.jpg')
