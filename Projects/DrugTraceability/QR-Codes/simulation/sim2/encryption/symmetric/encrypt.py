from cryptography.fernet import Fernet

# Generate a key for encryption and decryption
# You must store this key securely; this key is needed for both encryption and decryption
key = Fernet.generate_key()
cipher_suite = Fernet(key)

def encrypt_data(data):
    """Encrypt the data using Fernet symmetric encryption."""
    encrypted_data = cipher_suite.encrypt(data.encode())
    return encrypted_data

def decrypt_data(encrypted_data):
    """Decrypt the data using Fernet symmetric encryption."""
    decrypted_data = cipher_suite.decrypt(encrypted_data).decode()
    return decrypted_data
