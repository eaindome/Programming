import base64

# Read the key files
with open("./pemFiles/private_key.pem", "rb") as private_file:
    private_key = private_file.read()

with open("./pemFiles/public_key.pem", "rb") as public_file:
    public_key = public_file.read()

# Encode keys in base64
private_key_base64 = base64.b64encode(private_key).decode('utf-8')
public_key_base64 = base64.b64encode(public_key).decode('utf-8')

# Print the base64 encoded keys to add to .env file
print(f"PRIVATE_KEY=\n{private_key_base64}\n")
print(f"PUBLIC_KEY=\n{public_key_base64}\n")
