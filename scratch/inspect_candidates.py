import os
from PIL import Image, ImageStat

cand_dir = r'scratch/candidates'
for f in sorted(os.listdir(cand_dir)):
    p = os.path.join(cand_dir, f)
    with Image.open(p) as img:
        # Convert MPO to RGB if needed
        rgb = img.convert('RGB')
        stat = ImageStat.Stat(rgb)
        mean_brightness = stat.mean[0] * 0.299 + stat.mean[1] * 0.587 + stat.mean[2] * 0.114
        w, h = rgb.size
        aspect = w / h
        print(f"{f}: {w}x{h} (aspect {aspect:.2f}), mean brightness: {mean_brightness:.1f}")
