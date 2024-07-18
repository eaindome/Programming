import datetime
import zlib
from qrCode.operations import (
    generate_qr_code, scan_qr_code, 
    update_qr_data, decrypt_data, 
    decrypt_data_from_qr_code, load_private_key
)
from database.database import (
    get_qr_code_data, update_qr_code_history, 
    get_qr_code_history, get_manu_info, 
    get_dist_info, get_retail_info,
)

def manufacturer_actions(username):
    user_info = get_manu_info(username)
    if user_info:
        company_name = user_info['company_name']
        company_address = user_info['company_address']
        company_location = user_info['company_location']
        product_name = user_info['product_name']
        fda_code = user_info['fda_code']
        fda_reg_number = user_info['fda_reg_number']
    else:
        print("User information not found.")
        return 
    

    while True:
        print("1. Generate QR Code\n2. Scan QR Code\n3. Logout")
        choice = input("Enter your choice: ")

        if choice == '1':
            try:
                # get vital details
                product_serial_number = input("Enter the Product Serial Number: ")
                batch_no = input("Enter the Batch Number: ")
                manufacturing_date_obj = datetime.datetime.now()
                manufacturing_date = manufacturing_date_obj.strftime('%Y-%m-%d')
                expiry_date_obj = manufacturing_date_obj + datetime.timedelta(days=3*365)
                expiry_date = expiry_date_obj.strftime('%Y-%m-%d')

                # data to be stored in the qr code
                data = {
                    "Company Name": company_name,
                    "Company Address": company_address,
                    "Company Location": company_location,
                    "Product Name": product_name,
                    "Product Serial Number": product_serial_number,
                    "FDA Code": fda_code,
                    "Batch No": batch_no,
                    "Manufacturing Date": manufacturing_date,
                    "Expiry Date": expiry_date,
                    "FDA Reg Number": fda_reg_number
                }
                #print(f"Data type: {type(data)}")
                # data = str(data)
            except Exception as e:
                print(f"Roles error 1: {e}")
                return e
            
            # compressed_data = zlib.compress(data.encode())
            # # print(f"Compressed data: {compressed_data}\n")
            # # breakpoint()

            # generate qr code function
            try:
                # print(f"Data type: {type(data)}")
                generate_qr_code(data)
            except Exception as e:
                print(f"Roles error 2: {e}")
                return e
            
        elif choice == '2':
            qr_content = scan_qr_code()
            if qr_content:
                #decrypted_data = decrypt_data_from_qr_code(qr_content)
                print(f"Decrypted data: {qr_content}\n")
        elif choice == '3':
            break

def distributor_actions(username):
    dist_info = get_dist_info(username)
    if dist_info:
        distributor_name = dist_info['distributor_name']
        distributor_location = dist_info['distributor_location']
    else:
        print("User information not found.")
        return
    
    while True:
        print("1. Scan QR Code\n2. Logout")
        choice = input("Enter your choice: ")
        if choice == '1':
            qr_content, qr_id = scan_qr_code()
            if qr_content:
                # decrypted_data = decrypt_data_from_qr_code(qr_content)
                print(f"Data: \n{qr_content}\n")

                # try:
                #     qr_id = int(qr_content.split(',')[0].split(':')[1])
                # except(IndexError, ValueError):
                #     print("Invalid QR Code")
                #     continue
                if qr_id is not None:
                    while True:
                        print("1. Add data\n2. View Jourey\n3. Go back")
                        dec = input("Enter your choice: ")

                        if dec == '1':
                            update_qr_code_history(qr_id, 'distributor', {'name': distributor_name, 'location': distributor_location})
                            print("Data updated successfully.")
                        elif dec == '2':
                            history = get_qr_code_history(qr_id)
                            print(f"Journey: \n{history}")
                        elif dec == '3':
                            break
                        else:
                            print("Invalid choice. Enter 1, 2, or 3.")
                else:
                    print("Invalid QR Code: ID not found.")
            else:
                print("Failed to decrypt QR code content.")
        elif choice == '2':
            break
        else:
            print("Invalid choice. Enter 1 or 2.")

def retailer_actions(username):
    retail_info = get_retail_info(username)
    if retail_info: 
        retailer_name = retail_info['retailer_name']
        retailer_location = retail_info['retailer_location']
    else:
        print("User information not found.")
        return
    
    while True:
        print("1. Scan QR Code\n2. Logout")
        choice = input("Enter your choice: ")
        if choice == '1':
            qr_content, qr_id = scan_qr_code()
            if qr_content:
                # decrypted_data = decrypt_data_from_qr_code(qr_content)
                print(f"Data: \n{qr_content}\n")

                # try:
                #     qr_id = int(qr_content.split(',')[0].split(':')[1])
                # except(IndexError, ValueError):
                #     print("Invalid QR Code")
                #     continue

                if qr_id is not None:
                    while True:
                        print("1. Add data\n2. View Jourey\n3. Go back")
                        dec = input("Enter your choice: ")

                        if dec == '1':
                            update_qr_code_history(qr_id, 'retailer', {'name': retailer_name, 'location': retailer_location})
                            print("Data updated successfully.")
                        elif dec == '2':
                            history = get_qr_code_history(qr_id)
                            print(f"Journey: \n{history}")
                        elif dec == '3':
                            break
                        else:
                            print("Invalid choice. Enter 1, 2, or 3.")
                else:
                    print("Invalid QR Code: ID not found.")
            else:
                print("Failed to decrypt QR code content.")
        elif choice == '2':
            break
        else:
            print("Invalid choice. Enter 1 or 2.")

def user_actions():
    while True:
        print("1. Scan QR Code\n2. Logout")
        choice = input("Enter your choice: ")
        if choice == '1':
            qr_content, qr_id = scan_qr_code()
            if qr_content:
                # decrypted_data = decrypt_data_from_qr_code(qr_content)
                print(f"Decrypted data: {qr_content}")

                # try:
                #     qr_id = int(qr_content.split(',')[0].split(':')[1])
                # except(IndexError, ValueError):
                #     print("Invalid QR Code")
                #     continue

                if qr_id is not None:
                    while True:
                        print("1. Check Authenticity\n2. View Journey\n3. Go back")
                        dec = input("Enter your choice: ")

                        if dec == '1':
                            auth = get_qr_code_data(qr_id)
                            if auth:
                                print("Authenticity: Authentic"
                                    f"\nData: {auth[0]}\n")
                            else:
                                print("Authenticity: Not Authentic")
                        elif dec == '2':
                            history = get_qr_code_history(qr_id)
                            print(f"Journey: \n{history}\n")
                        elif dec == '3':
                            break
                        else:
                            print("Invalid choice. Enter 1, 2, or 3.\n")
                else:
                    print("Invalid QR Code: ID not found.")
        elif choice == '2':
            break
        else:
            print("Invalid choice. Enter 1 or 2.\n")
