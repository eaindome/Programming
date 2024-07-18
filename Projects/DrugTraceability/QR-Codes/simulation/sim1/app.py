import qrcode
import database

# Function to generate dynamic QR code with user data
def generate_dynamic_qr_code(name):
    # Fetch existing QR code content from the database
    existing_content = database.fetch_qr_code_content()
    
    # Concatenate existing content with new user data
    if existing_content:
        new_content = f"{existing_content}; Name: {name}"
    else:
        new_content = f"Name: {name}"
    
    # Insert or update QR code content in the database
    database.insert_or_update_qr_code_content(new_content)
    
    # Generate dynamic QR code with fetched content
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(new_content)
    qr.make(fit=True)
    
    # Create an image from the QR code
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save the image
    img.save("dynamic_qr_code.png")
    print("Dynamic QR Code generated successfully!")

# Example usage
if __name__ == "__main__":
    # Create database table if not exists
    database.create_table()
    
    # Simulate user A entering data
    user_a_name = input("Enter User A's Name: ")
    generate_dynamic_qr_code(user_a_name)
