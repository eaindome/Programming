from database import database
from pyzbar.pyzbar import decode
import cv2
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import os
import base64
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Read the private key from the .env file
private_key_base64 = os.getenv("PRIVATE_KEY")
private_key = serialization.load_pem_private_key(
    base64.b64decode(private_key_base64),
    password=None,
    backend=None
)

# function to decrypt data using the private key
def decrypt_data(encrypted_data):
    try:
        decoded_data = base64.b64decode(encrypted_data)
        decrypted_data = private_key.decrypt(
            decoded_data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return decrypted_data.decode()
    except Exception as e:
        print("Error decrypting data:", e)
        return None

# Function to scan QR code
def scan_qr_code():
    # Start video capture
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        
        # Decode QR code
        decoded_objects = decode(frame)
        
        for obj in decoded_objects:
            qr_content = obj.data.decode('utf-8')
            # Close the scanner after reading the QR code
            cap.release()
            cv2.destroyAllWindows()
            return obj.data.decode()
        
        # Display the frame
        cv2.imshow("QR Code Scanner", frame)
        
        # Exit when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # Release video capture
    cap.release()
    cv2.destroyAllWindows()
    return None

# Function to update QR code content with user's data
def update_qr_code_with_user_data():
    # Scan the QR code to retrieve existing data
    existing_data = scan_qr_code()

    if not existing_data:
        print("No QR code data found. Please ensure the QR code is properly scanned.")
        return
    
    # Decrypt the scanned data
    decrypted_data = decrypt_data(existing_data)
    
    # extract QR code ID from the scanned data (assuming the format is "ID: <id>;...")
    try: 
        qr_id = int(decrypted_data.split(':')[1].split(',')[0])
    except (IndexError, ValueError) as e:
        print("Error parsing QR code content. Please ensure it is in the correct format.")
        return
    

    # Prompt user A to enter their data
    user_name = input("Enter User's Name: ")
    
    # Generate dynamic QR code with user's data
    new_data = f"{decrypted_data};\nOther Name: {user_name}"
    if database.update_qr_code_content(qr_id, new_data):
        print("QR Code updated with user's data successfully!")
    else:
        print("Error updating QR code with user's data.")

