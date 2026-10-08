import pymupdf
from PIL import Image
import os

pdf_path = r'c:\Users\MD REHAN HUSSAIN\Documents\Uniqueiis\scratch\uiis.pdf'
out_base = r'c:\Users\MD REHAN HUSSAIN\Documents\Uniqueiis\public\images\uiis'
os.makedirs(out_base, exist_ok=True)
os.makedirs(os.path.join(out_base, 'commodities'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'industries'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'services'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'ndt'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'disciplines'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'tools'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'standards'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'people'), exist_ok=True)
os.makedirs(os.path.join(out_base, 'partners'), exist_ok=True)

doc = pymupdf.open(pdf_path)

# Helper to render a page at 300 DPI and return PIL Image
def get_page_image(page_num):
    pix = doc[page_num - 1].get_pixmap(dpi=300)
    return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

print("Rendering pages and extracting assets...")

# === PAGE 1 ===
p1 = get_page_image(1)
W, H = p1.size

# UIIS Logo on Page 1
# Box for emblem + text:
p1.crop((100, 40, 1300, 1050)).save(os.path.join(out_base, 'logo_full.png'))
# UIIS Emblem alone:
p1.crop((120, 40, 1150, 830)).save(os.path.join(out_base, 'logo_emblem.png'))

# Vision 2030 logo
p1.crop((1800, 40, 2400, 360)).save(os.path.join(out_base, 'vision_2030.png'))

# ISO 9001 badge
p1.crop((1820, 430, 2400, 930)).save(os.path.join(out_base, 'iso_9001.png'))

# Hero image (engineers + refinery + slogan)
p1.crop((0, 350, W, 2240)).save(os.path.join(out_base, 'hero_full.jpg'))
# Just the engineers and plant
p1.crop((550, 500, W, 2240)).save(os.path.join(out_base, 'hero_engineers.jpg'))

# Page 1 Commodities row:
# y range: ~2240 to 2860
commodities_y1, commodities_y2 = 2240, 2860
c_w = W / 6
c_names = [
    'pressure_vessels',
    'heat_exchangers',
    'gre_grp_piping',
    'structural_steel',
    'coating_inspection',
    'electrical_instrumentation'
]
for i, name in enumerate(c_names):
    x1 = int(i * c_w)
    x2 = int((i + 1) * c_w)
    crop_img = p1.crop((x1, commodities_y1, x2, commodities_y2))
    crop_img.save(os.path.join(out_base, 'commodities', f'{name}.jpg'))

# === PAGE 2 ===
p2 = get_page_image(2)
# Industries row
# y range: ~2500 to 3050
ind_y1, ind_y2 = 2520, 3050
ind_w = W / 5
ind_names = [
    'oil_and_gas',
    'petrochemical',
    'power_utilities',
    'water_infrastructure',
    'industrial_construction'
]
for i, name in enumerate(ind_names):
    x1 = int(i * ind_w)
    x2 = int((i + 1) * ind_w)
    p2.crop((x1, ind_y1, x2, ind_y2)).save(os.path.join(out_base, 'industries', f'{name}.jpg'))

# Why Choose section graphic
p2.crop((80, 1500, W - 80, 2050)).save(os.path.join(out_base, 'why_choose_uiis.jpg'))

# === PAGE 3 ===
p3 = get_page_image(3)
# Inspector with tablet & refinery:
p3.crop((1400, 600, W, 1700)).save(os.path.join(out_base, 'inspector_tablet.jpg'))
# Weld inspection:
p3.crop((1400, 1700, W, 2200)).save(os.path.join(out_base, 'weld_inspection.jpg'))
# Flange inspection:
p3.crop((1400, 2200, W, 2700)).save(os.path.join(out_base, 'flange_inspection.jpg'))

# === PAGE 4 ===
p4 = get_page_image(4)
# Vendor inspection main photos
p4.crop((1450, 400, W, 1400)).save(os.path.join(out_base, 'services', 'vid_engineers.jpg'))
p4.crop((1450, 1450, W, 2100)).save(os.path.join(out_base, 'services', 'vid_ultrasonic.jpg'))
p4.crop((1450, 2100, W, 2650)).save(os.path.join(out_base, 'services', 'vid_team_review.jpg'))
p4.crop((1450, 2650, W, 3100)).save(os.path.join(out_base, 'services', 'vid_packing_crate.jpg'))

# === PAGE 5 ===
p5 = get_page_image(5)
p5.crop((1200, 380, W, 1050)).save(os.path.join(out_base, 'services', 'heat_exchanger_bundle.jpg'))
p5.crop((1150, 1080, 1800, 1650)).save(os.path.join(out_base, 'services', 'dft_gauge_pipe.jpg'))
p5.crop((1800, 1080, W, 1650)).save(os.path.join(out_base, 'services', 'grp_pipe_inspection.jpg'))
p5.crop((1200, 1650, W, 2300)).save(os.path.join(out_base, 'services', 'ei_switchgear_inspection.jpg'))

# 4 photos bottom of Page 5
p5_bottom_w = W / 4
p5_bottom_names = ['pressure_vessel_insp', 'packing_readiness', 'valves_flanges', 'rotating_equipment']
for i, name in enumerate(p5_bottom_names):
    x1 = int(i * p5_bottom_w)
    x2 = int((i + 1) * p5_bottom_w)
    p5.crop((x1, 2980, x2, 3320)).save(os.path.join(out_base, 'services', f'{name}.jpg'))

# === PAGE 6 ===
p6 = get_page_image(6)
p6.crop((1300, 350, W, 1350)).save(os.path.join(out_base, 'services', 'pid_site_engineer.jpg'))
p6.crop((1300, 1370, W, 2150)).save(os.path.join(out_base, 'services', 'vsa_factory_audit.jpg'))
p6.crop((1000, 2150, W, 2900)).save(os.path.join(out_base, 'services', 'pes_technical_team.jpg'))

# === PAGE 7 (NDT & Partners) ===
p7 = get_page_image(7)
# Top NDT technician with flaw detector
p7.crop((1200, 350, W, 1500)).save(os.path.join(out_base, 'ndt', 'ndt_technician_hero.jpg'))

# NDT Methods: 6 cards in 2 rows of 3
# Row 1: y: ~1600 to 2050
# Row 2: y: ~2050 to 2500
ndt_methods = [
    ('ut_ultrasonic', 0, 1600, 1, 2050),
    ('rt_radiography', 1, 1600, 2, 2050),
    ('mt_magnetic', 2, 1600, 3, 2050),
    ('pt_penetrant', 0, 2050, 1, 2500),
    ('vt_visual', 1, 2050, 2, 2500),
    ('holiday_testing', 2, 2050, 3, 2500),
]
col_w = (2350 - 1170) / 3
for name, c1, y1, c2, y2 in ndt_methods:
    x1 = int(1170 + c1 * col_w)
    x2 = int(1170 + c2 * col_w)
    p7.crop((x1, y1, x2, y2)).save(os.path.join(out_base, 'ndt', f'{name}.jpg'))

# Partner logos strip on Page 7
# y: ~2620 to 2950, x: 100 to 2380
# 12 logos: 2 rows of 6
p7.crop((100, 2580, 2380, 2980)).save(os.path.join(out_base, 'partners', 'all_partners_strip.png'))

partner_row1 = ['sepco', 'subsea7', 'jgc_gulf', 'tecnicas_reunidas', 'larsen_toubro', 'saipem']
partner_row2 = ['cbi', 'klc', 'br_cat', 'wison', 'osc', 'sinopec']
w_p = (2380 - 100) / 6
for i, name in enumerate(partner_row1):
    x1 = int(100 + i * w_p)
    x2 = int(100 + (i + 1) * w_p)
    p7.crop((x1, 2600, x2, 2790)).save(os.path.join(out_base, 'partners', f'{name}.png'))
for i, name in enumerate(partner_row2):
    x1 = int(100 + i * w_p)
    x2 = int(100 + (i + 1) * w_p)
    p7.crop((x1, 2790, x2, 2980)).save(os.path.join(out_base, 'partners', f'{name}.png'))

# === PAGE 8 (Workflow) ===
p8 = get_page_image(8)
p8.crop((100, 750, 2380, 2000)).save(os.path.join(out_base, 'workflow_grid.jpg'))

# === PAGE 9 (Competence, Standards, Tools) ===
p9 = get_page_image(9)
# Disciplines: 10 images (2 rows of 5)
# Row 1: y: ~1120 to 1420
# Row 2: y: ~1520 to 1820
disp_w = (2380 - 100) / 5
disp_r1 = ['mech_equipment', 'piping_pipeline', 'valves_flow_control', 'gre_grp_piping', 'coating_painting']
disp_r2 = ['structural_steel', 'electrical_equipment', 'instrumentation', 'rotating_equipment', 'special_processes']
for i, name in enumerate(disp_r1):
    x1 = int(100 + i * disp_w)
    x2 = int(100 + (i + 1) * disp_w)
    p9.crop((x1, 1120, x2, 1420)).save(os.path.join(out_base, 'disciplines', f'{name}.jpg'))
for i, name in enumerate(disp_r2):
    x1 = int(100 + i * disp_w)
    x2 = int(100 + (i + 1) * disp_w)
    p9.crop((x1, 1520, x2, 1820)).save(os.path.join(out_base, 'disciplines', f'{name}.jpg'))

# Standards strip:
p9.crop((100, 1950, 2380, 2320)).save(os.path.join(out_base, 'standards', 'all_standards_strip.png'))

# Inspector qualifications:
p9.crop((100, 2380, 2380, 2720)).save(os.path.join(out_base, 'qualifications_strip.png'))

# Tools: 8 tools in a row: y: ~2780 to 3120
tools_w = (2380 - 100) / 8
tools_list = [
    'dft_gauge',
    'ultrasonic_thickness_gauge',
    'coating_holiday_detector',
    'welding_gauge_set',
    'calibrated_measuring_tools',
    'borescope_videoscope',
    'ndt_equipment',
    'inspection_photography'
]
for i, name in enumerate(tools_list):
    x1 = int(100 + i * tools_w)
    x2 = int(100 + (i + 1) * tools_w)
    p9.crop((x1, 2780, x2, 3120)).save(os.path.join(out_base, 'tools', f'{name}.jpg'))

# === PAGE 10 (People) ===
p10 = get_page_image(10)
# Our People row: 5 photos: y: ~2340 to 2750
people_w = (2380 - 100) / 5
people_list = [
    'field_inspection',
    'project_support',
    'technical_discussion',
    'quality_assurance',
    'teamwork_on_site'
]
for i, name in enumerate(people_list):
    x1 = int(100 + i * people_w)
    x2 = int(100 + (i + 1) * people_w)
    p10.crop((x1, 2340, x2, 2750)).save(os.path.join(out_base, 'people', f'{name}.jpg'))

# Organization chart:
p10.crop((100, 750, 2380, 1500)).save(os.path.join(out_base, 'org_chart.jpg'))

# === PAGE 11 (Worldwide Network) ===
p11 = get_page_image(11)
# Globe graphic
p11.crop((200, 750, 2280, 2700)).save(os.path.join(out_base, 'worldwide_globe.jpg'))

# === PAGE 12 (Contact & HQ) ===
p12 = get_page_image(12)
# UIIS HQ Building:
p12.crop((1050, 550, 2380, 1420)).save(os.path.join(out_base, 'uiis_hq_building.jpg'))
# Location Map:
p12.crop((950, 1450, 2380, 2250)).save(os.path.join(out_base, 'uiis_location_map.jpg'))
# Night refinery skyline:
p12.crop((0, 2250, W, 2750)).save(os.path.join(out_base, 'night_refinery_skyline.jpg'))

print("All assets extracted successfully!")
