import cv2
from pyzbar.pyzbar import decode
import qrcode

# Function to scan QR code
def scan_qr_code():
    # Start video capture
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        
        # Decode QR code
        decoded_objects = decode(frame)
        
        for obj in decoded_objects:
            print("Data:", obj.data.decode())
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

# Function to generate QR code with user data
def generate_qr_code_with_user_data(existing_data):
    # Prompt user for name and age
    name = input("Enter your name: ")
    age = input("Enter your age: ")
    
    # Add user data to existing data
    new_data = f"{existing_data}; Name: {name}; Age: {age}"
    
    # Generate QR code with new data
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(new_data)
    qr.make(fit=True)
    
    # Create an image from the QR code
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save the image
    img.save("generated_qr_code_with_user_data.png")
    print("QR Code generated successfully with user data!")

# Example usage
# Scan QR code and get existing data
existing_data = scan_qr_code()
print("Scanned Data:", existing_data)

# Generate QR code with user data
generate_qr_code_with_user_data(existing_data)
