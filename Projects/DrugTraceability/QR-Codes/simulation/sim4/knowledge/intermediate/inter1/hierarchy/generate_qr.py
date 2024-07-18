import qrcode
import os
from .models import Node
from database.company import get_company_info

BASE_URL = "http://localhost:5000"

def generate_qr_code(data, file_path):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill='black', back_color='white')
    img.save(file_path)

def generate_qrs_for_hierarchy(packs):
    qr_base_path = 'qr_codes'
    if not os.path.exists(qr_base_path):
        os.makedirs(qr_base_path)
    
    for pack in packs:
        pack_dir = os.path.join(qr_base_path, pack.name)
        if not os.path.exists(pack_dir):
            os.makedirs(pack_dir)
        
        pack_url = f"{BASE_URL}/pack/{pack.id}"
        generate_qr_code(pack_url, os.path.join(pack_dir, f"{pack.name}.png"))
        
        for box in pack.children:
            box_dir = os.path.join(pack_dir, box.name)
            if not os.path.exists(box_dir):
                os.makedirs(box_dir)
            
            box_url = f"{BASE_URL}/box/{box.id}"
            generate_qr_code(box_url, os.path.join(box_dir, f"{box.name}.png"))
            
            for product in box.children:
                product_dir = os.path.join(box_dir, 'products')
                if not os.path.exists(product_dir):
                    os.makedirs(product_dir)
                
                product_url = f"{BASE_URL}/product/{product.id}"
                generate_qr_code(product_url, os.path.join(product_dir, f"{product.name}.png"))


