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

# Function to decrypt data using the private key
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

# Function to scan QR code and return its content
def scan_qr_code():
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        decoded_objects = decode(frame)
        
        for obj in decoded_objects:
            qr_content = obj.data.decode('utf-8')
            cap.release()
            cv2.destroyAllWindows()
            return qr_content
        
        cv2.imshow("QR Code Scanner", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()
    return None

# Function to fetch the latest data from the database using the scanned QR code
def fetch_latest_data_from_qr(show_id=False):
    # Scan the QR code
    qr_content = scan_qr_code()

    #print(f"qr_content: {qr_content}\n")
    
    if not qr_content:
        print("No QR code data found. Please ensure the QR code is properly scanned.")
        return
    
    # Decrypt the scanned data
    decrypted_data = decrypt_data(qr_content)

    # error handling
    if decrypted_data is None:
        print("Error decrypting data. Please ensure the correct private key is loaded.")
        return
    
    # Extract QR code ID from the scanned data (assuming the format is "ID:<id>")
    try:
        #print(f"decrypted_data: {decrypted_data}")
        qr_id = int(decrypted_data.split(':')[1].split(',')[0]) # int(qr_content.split(":")[1])
    except (IndexError, ValueError) as e:
        print("Error parsing QR code content. Please ensure it is in the correct format.")
        return
    
    # Fetch the latest data from the database using the QR code ID
    latest_data = database.fetch_qr_code_content(qr_id)
    
    if latest_data:
        # Remove the ID from the latest data before displaying
        content_without_id = latest_data.split('\n', 1)[1]

        if show_id:
            print(f"Latest data for QR code ID {qr_id}: \n{latest_data}")
        else:
            print(f"Latest data: \n{content_without_id}")
    else:
        print(f"No data found for QR code ID {qr_id}")

if __name__ == "__main__":
    fetch_latest_data_from_qr()

'''
Great, so right now, I want to scale it up to be like a normal 
application. So it runs still someone enters quits or exit. 
So first, creating a simple database to store users. What I really
wanted to implement was a supply chain wher userA was the manufacturer
userB was the distributor and userC was the retailer then userD was a normal
user. So userA would encode data and generate the QR code, userB to userC would scan the
QR code and update it with their various data 
and userD would scan the QR code to get the data thus checking the authenticity of the product and 
its journey throughout the supply chain. 
So something like this, when userA generates the QR code, it would be stored in the database with the
data and the ID of the QR code. Then when userB scans the QR code, it would update the data in the database
and so on.
So when the app is run, it would ask the user to enter their username, since I don't want users to know
what they can login as, that'll be it for that interface, then a check is done to see if the username exist
based on the username, the user is then asked to enter their password, if the password is correct, the user would have
several options. If the user is 
a. The Manufacturer
    - Generate QR Code
    - View QR Code
b. The Distributor
    - Scan QR Code
    - View QR Code
    - update data in the database with distributor information
c. The Retailer
    - Scan QR Code
    - View QR Code
    - update data in the database with retailer information
d. The Normal User
    - Scan QR Code
    - View QR Code
    - Check the authenticity of the product
    - View the journey of the product (that is by printing out the data embedded in the dynamic qr code)

So something like this basically
'''