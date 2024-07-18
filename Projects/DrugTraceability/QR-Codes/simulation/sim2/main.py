import sys
import users
from users import userA, users    #, user_c, user_d, user_e

def main():
    # get user input or command-line argument to determine the user
    user_choice = input("Enter user (A, B): ").strip().upper()

    # check if the user choice is valid
    if user_choice not in ["A", "B"]:
        print("Invalid user choice. Please enter A, B")
        sys.exit(1)

    # import the appropriate module based on the user choice
    if user_choice == "A":
        # Prompt user A to enter their data
        user_a_name = input("Enter User A's Name: ")
        userA.generate_dynamic_qr_code(user_a_name)
        
    elif user_choice == "B":
        users.update_qr_code_with_user_data()

    else:
        print("User not found.")
        sys.exit(1)

if __name__ == "__main__":
    main()


