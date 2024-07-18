import qrcode
from database import database
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import os
import base64
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

# Read the public key from the .env file
public_key_base64 = os.getenv("PUBLIC_KEY")
public_key = serialization.load_pem_public_key(
    base64.b64decode(public_key_base64),
    backend=None
)

# Function to encrypt data using the public key
def encrypt_data(data):
    encrypted_data = public_key.encrypt(
        data.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return base64.b64encode(encrypted_data).decode('utf-8')


# Function to generate dynamic QR code with user A's data
def generate_dynamic_qr_code(name):
    database.create_table()  # Ensure the table exists

    # create new content for the QR code
    content = f"First Name: {name}"

    # Insert the new content into the database
    qr_id = database.insert_qr_code_content(content)

    if qr_id is None:
        print("Error inserting QR code content into the database.")
        return
    
    # Add the ID to the content
    new_content = f"ID: {qr_id},\n{content}"

    # print(f"new_content: {new_content}")

    # encrypt the data before generating the QR code
    encrypted_data = encrypt_data(new_content)
    print(f"encrypted data: {encrypted_data}")
    
    # Generate dynamic QR code with fetched content
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(encrypted_data)   # (new_content)
    qr.make(fit=True)
    
    # Create an image from the QR code
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save the image
    trial = 2
    img.save(f"./qr_codes/dynamic_qr_code-{trial}.png")
    print("Dynamic QR Code generated successfully!")



''''''

















# # Example usage
# if __name__ == "__main__":
#     # Generate dynamic QR code for User A
#     generate_dynamic_qr_code()

# import sqlite3

# Function to create database table
# def create_table():
#     try:
#         print("Creating table...")
#         conn = sqlite3.connect('qr_code.db')
#         c = conn.cursor()
#         c.execute('''CREATE TABLE IF NOT EXISTS qr_codes (id INTEGER PRIMARY KEY, content TEXT)''')
#         conn.commit()
#         conn.close()
#         print("Table created successfully!")
#         return True
#     except Exception as e:
#         print("Error creating table:", e)
#         return False

