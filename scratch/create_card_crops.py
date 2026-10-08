import os
from PIL import Image

opt_dir = r'scratch/optimized'
preview_dir = r'scratch/card_previews'
os.makedirs(preview_dir, exist_ok=True)

# Function to simulate Next.js object-cover into 420x520 (or scaled 840x1040 for 2x retina)
def create_card_crop(img_name, out_name, focal_x=0.5, focal_y=0.5):
    img_path = os.path.join(opt_dir, img_name)
    with Image.open(img_path) as img:
        w, h = img.size
        target_w, target_h = 840, 1040 # 2x retina card
        target_ratio = target_w / target_h # 0.8077
        img_ratio = w / h
        
        if img_ratio > target_ratio:
            # Image is wider than target: crop width
            new_w = int(h * target_ratio)
            left = int((w - new_w) * focal_x)
            crop_box = (left, 0, left + new_w, h)
        else:
            # Image is taller than target: crop height
            new_h = int(w / target_ratio)
            top = int((h - new_h) * focal_y)
            crop_box = (0, top, w, top + new_h)
            
        cropped = img.crop(crop_box).resize((target_w, target_h), Image.Resampling.LANCZOS)
        cropped.save(os.path.join(preview_dir, out_name), 'JPEG', quality=90)
        print(f"Created card preview {out_name}: {cropped.size}")

# Test crops
create_card_crop('oil_and_gas_1_opt.jpg', 'card_og1.jpg', 0.5, 0.4)
create_card_crop('oil_and_gas_2_opt.jpg', 'card_og2.jpg', 0.5, 0.4)
create_card_crop('petrochemical_1_opt.jpg', 'card_petro1.jpg', 0.5, 0.5)
create_card_crop('petrochemical_2_opt.jpg', 'card_petro2.jpg', 0.5, 0.4)
create_card_crop('power_1_opt.jpg', 'card_power1.jpg', 0.5, 0.5)
create_card_crop('power_2_opt.jpg', 'card_power2.jpg', 0.5, 0.4)
create_card_crop('water_1_opt.jpg', 'card_water1.jpg', 0.5, 0.4)
create_card_crop('water_2_opt.jpg', 'card_water2.jpg', 0.5, 0.5)
create_card_crop('construction_1_opt.jpg', 'card_const1.jpg', 0.5, 0.4)
create_card_crop('construction_2_opt.jpg', 'card_const2.jpg', 0.5, 0.4)
