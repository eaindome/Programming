import sys
import cv2  # OpenCV for video capture
import pyzbar.pyzbar as pyzbar  # Pyzbar for QR code decoding

def scan_qr():
    # Open the default camera
    cap = cv2.VideoCapture(0)
    
    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        
        if not ret:
            print("Failed to grab frame")
            break
        
        # Decode QR codes
        decoded_objects = pyzbar.decode(frame)
        
        for obj in decoded_objects:
            # Print the decoded text
            qr_data = obj.data.decode("utf-8")
            # print(f"QR Code: {qr_data}")
            cap.release()
            cv2.destroyAllWindows()
            return qr_data
        
        # Display the frame
        cv2.imshow('QR Code Scanner', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()
    return ""

if __name__ == "__main__":
    qr_data = scan_qr()
    if qr_data:
        print(qr_data)
    else:
        print("No QR code found")
