import qrcode, sqlite3
from pyzbar.pyzbar import decode
import cv2

from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding

import os, json, zlib, base64
from dotenv import load_dotenv
from database.database import insert_qr_code, update_qr_code_history

# Load environment variables
load_dotenv()
output_directory = "./qrCode/code/"
os.makedirs(output_directory, exist_ok=True)


# load the private key from the .env file
def load_private_key():
    try:
        if os.path.exists('.env'):
            with open('.env', 'r') as env_file:
                lines = env_file.readlines()
                for line in lines:
                    if line.startswith('PRIVATE_KEY'):
                        private_key_base64 = line.strip().split('=', 1)[1].strip().strip('"')
                        private_key_pem = base64.b64decode(private_key_base64).decode('utf-8')
                        return private_key_pem
        raise Exception("Private key not found in .env file.")
    except Exception as e:
        print(f"Error loading private key: {e}")
        return None

# get trial number
def get_next_trial_number(directory):
    files = os.listdir(directory)
    max_trial = 0
    for file in files:
        if file.startswith("qr_code_") and file.endswith(".png"):
            try:
                trial_num = int(file.split("_")[2].split(".")[0])
                if trial_num > max_trial:
                    max_trial = trial_num
            except ValueError:
                continue
    return max_trial + 1


# ENCRYPTION
# generate rsa keys
def generate_rsa_keys():
    private_key = None

    try:
        if os.path.exists('.env'):
            with open('.env', 'r') as env_file:
                lines = env_file.readlines()
                for line in lines:
                    if line.startswith('PRIVATE_KEY'):
                        private_key_base64 = line.strip().split('=', 1)[1].strip().strip('"')
                        private_key_pem = base64.b64decode(private_key_base64).decode('utf-8')
                        private_key = RSA.import_key(private_key_pem)
                        public_key = private_key.publickey()
                        return private_key, public_key
        
        # If no private key found in .env, generate a new key pair
        if private_key is None:
            key = RSA.generate(2048)
            private_key = key.export_key()
            public_key = key.publickey()

            # Base64 encode the private key for storage
            private_key_base64 = base64.b64encode(private_key).decode('utf-8')

            with open('.env', 'a') as env_file:
                env_file.write(f'PRIVATE_KEY="{private_key_base64}"\n')

        return private_key, public_key
    except Exception as e:
        print(f"Error handling RSA keys: {e}")
        return None, None

# encrypt data
def encrypt_data(data, public_key):
    try:
        # Generate a random AES key
        aes_key = get_random_bytes(32)  # 256-bit key

        # generate a nonce
        nonce = get_random_bytes(16)

        # Encrypt the data with AES
        cipher_aes = AES.new(aes_key, AES.MODE_GCM, nonce=nonce)
        ct_bytes, tag = cipher_aes.encrypt_and_digest(data)

        # Encrypt the AES key with RSA
        rsa_cipher = PKCS1_OAEP.new(public_key)
        encrypted_aes_key = rsa_cipher.encrypt(aes_key)

        # Encode the AES components to base64 to make them JSON serializable
        encrypted_aes_key = base64.b64encode(encrypted_aes_key).decode('utf-8')
        iv = base64.b64encode(cipher_aes.nonce).decode('utf-8')
        ct = base64.b64encode(ct_bytes).decode('utf-8')
        tag = base64.b64encode(tag).decode('utf-8')

        return encrypted_aes_key, iv, ct, tag
    except Exception as e:
        print(f"Error encrypting data 1: {e}")
        raise e




# DECRYPTION
# decrypt_data function
def decrypt_data(encrypted_aes_key, iv, ct_bytes, tag, private_key_pem):
    try:
        # Load the RSA private key
        private_key = RSA.import_key(private_key_pem)

        # Decrypt the AES key with the RSA private key
        rsa_cipher = PKCS1_OAEP.new(private_key)
        aes_key = rsa_cipher.decrypt(encrypted_aes_key)

        # Decrypt the data with the AES key
        cipher_aes = AES.new(aes_key, AES.MODE_GCM, nonce=iv)
        decrypted_data = cipher_aes.decrypt_and_verify(ct_bytes, tag)

        # Decompress the data
        decompressed_data = zlib.decompress(decrypted_data)

        return decompressed_data.decode('utf-8')
    except Exception as e:
        print(f"Error decrypting data: {e}")
        return str(e)
    
# decrypt_data_from_qr_code function
def decrypt_data_from_qr_code(encrypted_data_json, private_key_pem):
    try:
        # Decode the JSON string
        encrypted_data = json.loads(encrypted_data_json)

        # extract the QR code ID
        qr_id = encrypted_data.get('id')
        
        # Decode the base64 encoded components
        encrypted_aes_key = base64.b64decode(encrypted_data['key'])
        iv = base64.b64decode(encrypted_data['iv'])
        ct_bytes = base64.b64decode(encrypted_data['data'])
        tag = base64.b64decode(encrypted_data['tag'])

        # Decrypt the data
        decrypted_data = decrypt_data(encrypted_aes_key, iv, ct_bytes, tag, private_key_pem)
        
        return decrypted_data, qr_id
    except Exception as e:
        print(f"Error decrypting data from QR code: {e}")
        return str(e)



# QR CODES
# generate qr code
def generate_qr_code(data):
    try:
        # Convert the data dictionary to a JSON string
        if isinstance(data, dict):
            data_str = json.dumps(data)
        else:
            print(type(data))
            raise ValueError("Data must be a dictionary")
        
        try:
            #print(f"Data: {data}")
            company_name = data["Company Name"]
            company_address = data["Company Address"]
            company_location = data["Company Location"]
        except Exception as e:
            print(f"Error extracting company data: {e}")
            return e
        
        # Compress the data
        compressed_data = zlib.compress(data_str.encode())

        # Generate RSA keys
        try:
            private_key, public_key = generate_rsa_keys()
            if private_key is None or public_key is None:
                raise ValueError("Failed to generate or load RSA keys")
        except Exception as e:
            print(f"Error generating RSA keys: {e}")
            return e

        # Encrypt the compressed data
        encrypted_aes_key, iv, ct, tag = encrypt_data(compressed_data, public_key)
        
        # Combine the encrypted components
        combined_data = {
            'key': encrypted_aes_key,
            'iv': iv,
            'data': ct,
            'tag': tag
        }

        # Convert to JSON string
        json_data = json.dumps(combined_data)

        # store the QR code data in the database
        qr_id = insert_qr_code(json_data)

        update_qr_code_history(qr_id, 'Company', {'name': company_name, 'address': company_address, 'location': company_location})

        # include the QR code ID in the combined data
        combined_data['id'] = qr_id

        # convert to JSON string with the ID included
        json_data_with_id = json.dumps(combined_data)
        
        # Generate the QR code
        qr = qrcode.QRCode(
            version=None,  # Let the library automatically determine the version
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(json_data_with_id)
        qr.make(fit=True)
        
        trial = get_next_trial_number(output_directory)
        img = qr.make_image(fill='black', back_color='white')
        try:
            print("Saving QR code...")
            img.save(f"./qrCode/code/qr_code_{trial}.png")
        except Exception as e:
            print(f"Error saving QR code: {e}")
            return e

        
        # Store the QR code data in the database
        # insert_qr_code(json_data)
        
        print("QR code generated successfully.")
        return qr_id
    except Exception as e:
        print(f"Error generating QR code: {e}")
        return e


# scan qr code function
def scan_qr_code():
    try: 
        try:
            private_key_pem = load_private_key()
            #print(f"Private key: {private_key_pem}")
        except Exception as e:
            print(f"Error loading private key 2: {e}")
            return e

        cap = cv2.VideoCapture(0)
        while True:
            ret, frame = cap.read()
            decoded_objects = decode(frame)
            
            for obj in decoded_objects:
                qr_content = obj.data.decode('utf-8')
                cap.release()
                cv2.destroyAllWindows()
                
                try:
                    # Decrypt the QR code content
                    decrypted_data, qr_id = decrypt_data_from_qr_code(qr_content, private_key_pem)
                    if qr_id is None:
                        raise ValueError(f"QR code ID not found in decrypted data: {decrypted_data}")
                    return decrypted_data, qr_id
                except Exception as e:
                    print(f"Error decrypting QR code content: {e}")
                    return e
            
            cv2.imshow("QR Code Scanner", frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()
        return 
    except Exception as e:
        print(f"Error scanning QR code: {e}")
        return e

# update qr data
def update_qr_data(qr_id, role, new_data):
    conn = sqlite3.connect('supply_chain.db')
    c = conn.cursor()
    
    c.execute('''SELECT history FROM qr_codes WHERE id = ?''', (qr_id,))
    history = c.fetchone()
    
    if history:
        history = json.loads(history[0])
    else:
        history = []

    history.append({role: new_data})
    
    c.execute('''UPDATE qr_codes SET history = ? WHERE id = ?''', (json.dumps(history), qr_id))
    
    conn.commit()
    conn.close()














'''
# Load environment variables
# load_dotenv()

# Read the keys from the .env file
# public_key_base64 = os.getenv("PUBLIC_KEY")
# private_key_base64 = os.getenv("PRIVATE_KEY")

# public_key = serialization.load_pem_public_key(
#     base64.b64decode(public_key_base64),
#     backend=None
# )

# private_key = serialization.load_pem_private_key(
#     base64.b64decode(private_key_base64),
#     password=None,
#     backend=None
# )

# def encrypt_data(data):
#     try:
#         encrypted_data = public_key.encrypt(
#             data.encode(),
#             padding.OAEP(
#                 mgf=padding.MGF1(algorithm=hashes.SHA256()),
#                 algorithm=hashes.SHA256(),
#                 label=None
#             )
#         )
#         return base64.b64encode(encrypted_data).decode()
#     except Exception as e:
#         print(f"Error encrypting data: {e}")
#         print(f"Data: {data}")
#         print(f"Public key: {public_key}")
#         print(f"Data size: {len(data.encode())} bytes")
#         print(f"Public key size: {public_key.key_size} bits")
#         return e

# def decrypt_data(encrypted_data):
#     try:
#         decoded_data = base64.b64decode(encrypted_data)
#         decrypted_data = private_key.decrypt(
#             decoded_data, 
#             padding.OAEP(
#                 mgf=padding.MGF1(algorithm=hashes.SHA256()),
#                 algorithm=hashes.SHA256(),
#                 label=None
#             )
#         )
#         return decrypted_data.decode()
#     except Exception as e:
#         print("Error decrypting data:", e)
#         # return None

# # decrypt data   
# def decrypt_data(encrypted_aes_key, iv, ct_bytes, private_key_pem):
#     try:
#         # Decrypt the AES key with the RSA private key
#         private_key = serialization.load_pem_private_key(private_key_pem, password=None)
#         aes_key = private_key.decrypt(
#             encrypted_aes_key,
#             padding.OAEP(
#                 mgf=padding.MGF1(algorithm=hashes.SHA256()),
#                 algorithm=hashes.SHA256(),
#                 label=None
#             )
#         )
        
#         # Decrypt the data with the AES key
#         cipher_aes = AES.new(aes_key, AES.MODE_CBC, iv)
#         data = unpad(cipher_aes.decrypt(ct_bytes), AES.block_size)
        
#         return data.decode('utf-8')
#     except Exception as e:
#         print("Error decrypting data 2:", e)
#         return e
'''
