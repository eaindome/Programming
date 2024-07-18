import os
import requests
from PIL import Image
from pyzbar.pyzbar import decode

def scan_qr_code(image_path):
    # Open the image and decode the QR code
    img = Image.open(image_path)
    decoded_objects = decode(img)
    
    for obj in decoded_objects:
        qr_data = obj.data.decode('utf-8')
        return qr_data
    return None

def fetch_details_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching details: {e}")
        return None

def main():
    # Example image paths (you can change these to test different QR codes)
    example_images = [
        'qr_codes/Pack1/Pack1.png',
        'qr_codes/Pack1/Box1_1/Box1_1.png',
        'qr_codes/Pack1/Box1_1/products/Product_1101.png',
    ]
    
    for image_path in example_images:
        if os.path.exists(image_path):
            print(f"\nScanning QR code from: {image_path}")
            qr_data = scan_qr_code(image_path)
            
            if qr_data:
                print(f"QR Code Data: {qr_data}")
                details = fetch_details_from_url(qr_data)
                
                if details:
                    print(f"Fetched Details: {details}")
                else:
                    print("Failed to fetch details from the URL.")
            else:
                print("No QR code found in the image.")
        else:
            print(f"Image path does not exist: {image_path}")

if __name__ == "__main__":
    main()
