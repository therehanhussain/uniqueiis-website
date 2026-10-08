import zipfile
import xml.etree.ElementTree as ET
import os
import json

docx_path = r'C:\Users\MD REHAN HUSSAIN\Downloads\03c1d687-1721-470b-9cfa-682c54ef2238.docx'
out_dir = r'c:\Users\MD REHAN HUSSAIN\Documents\Uniqueiis\public\images\partners'
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(docx_path, 'r') as z:
    rels_xml = z.read('word/_rels/document.xml.rels')
    rels_root = ET.fromstring(rels_xml)
    rel_map = {rel.attrib.get('Id'): rel.attrib.get('Target') for rel in rels_root}

    doc_xml = z.read('word/document.xml')
    root = ET.fromstring(doc_xml)
    
    drawings = []
    for d in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}drawing'):
        docPr = d.find('.//{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}docPr')
        blip = d.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
        descr = docPr.attrib.get('descr', '') if docPr is not None else ''
        name = docPr.attrib.get('name', '') if docPr is not None else ''
        rId = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed', '') if blip is not None else ''
        target = rel_map.get(rId, '')
        
        # Extract the image file to out_dir
        if target:
            img_in_zip = 'word/' + target
            ext = os.path.splitext(target)[1]
            out_filename = f"partner_{len(drawings)+1:02d}{ext}"
            out_path = os.path.join(out_dir, out_filename)
            with open(out_path, 'wb') as f_out:
                f_out.write(z.read(img_in_zip))
            drawings.append({
                'index': len(drawings) + 1,
                'name': name,
                'descr': descr,
                'rId': rId,
                'target': target,
                'filename': out_filename,
                'publicPath': f"/images/partners/{out_filename}"
            })

print(f"Extracted {len(drawings)} images to {out_dir}")
with open(r'c:\Users\MD REHAN HUSSAIN\Documents\Uniqueiis\lib\partners_data.json', 'w', encoding='utf-8') as f:
    json.dump(drawings, f, indent=2, ensure_ascii=False)

for d in drawings:
    print(f"{d['index']}: {d['filename']} | {d['descr']}")
