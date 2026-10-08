import pymupdf
import os

pdf_path = r'c:\Users\MD REHAN HUSSAIN\Documents\Uniqueiis\scratch\uiis.pdf'
out_dir = r'c:\Users\MD REHAN HUSSAIN\Documents\Uniqueiis\scratch\pages'
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)
print(f"Total pages: {len(doc)}")

for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    page_img_path = os.path.join(out_dir, f"page_{i+1:02d}.jpg")
    pix.save(page_img_path)
    img_list = page.get_images()
    print(f"Page {i+1}: rendered {pix.width}x{pix.height}, embedded images: {len(img_list)}")
    for j, img in enumerate(img_list):
        xref = img[0]
        base_img = doc.extract_image(xref)
        print(f"  img {j+1}: xref {xref}, {base_img['width']}x{base_img['height']} {base_img['ext']}")

print("Done rendering pages.")
