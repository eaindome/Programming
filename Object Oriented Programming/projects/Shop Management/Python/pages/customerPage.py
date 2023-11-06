from data.customer import customer_data
from .loadingPage import landingPage, exit_program, clearConsole
from user.customer import Customer
from utilities.utils import clearConsole, exit_program, startOver

# Sample customer data stored in a dictionary (replace with your actual data)
"""customer_data = {
    "user1": {"password": "password1", "name": "John Doe", "email": "john@example.com"},
    "user2": {"password": "password2", "name": "Jane Smith", "email": "jane@example.com"},
}"""

# function to go to shopping landing page
def go_shopping():
    pass

# function to check user profile
def check_profile(customer):
    customer.get_name()
    customer.get_username()
    pass

# function to check balance
def check_balance(customer):
    print(f"Balance: f{customer.get_balance()}")

# customer login function
def customer_login():
    clearConsole()
    print("Welcome, Customer!")
    customerLogin()

# sign up function
def sign_up_customer():
    while True:
        try:
            clearConsole()
            print("Sign Up as a Customer")

            # take user information
            customer_name = input("Enter your name: ")
            customer_username = input("Enter a username: ")
            customer_email = input("Enter email: ")
            
            initial_password = input("Enter password: ")
            confirm_password = input("Confirm password: ")
            if initial_password == confirm_password:
                customer_password = initial_password

            # generate customer_id
            customer_id = Customer.generate_customer_id()

            # create a customer object
            new_customer = Customer(
                customer_name=customer_name,
                customer_username=customer_username,
                customer_email=customer_email,
                customer_password=customer_password,
                customer_id=customer_id
            )

            # store the customer object in the customer_data
            customer_data[customer_username] = new_customer

            landing_page_callback = landingPage()

            startOver(landing_page_callback)
            print("Registration successful!")
            input("\nPress Enter to continue")
            startOver()
        except ValueError:
            print("Invalid input. Please enter a valid number.")
        
        input("\nPress Enter to continue...")

# login functionality for customers
def customerLogin():
    for _ in range(5):
        username = input("Enter your username: ")
        password = input("Enter your password: ")

        if username in customer_data and customer_data[username]['password'] == password:
            print('Login successful!')
            customerLandingPage(customer=username)
        else:
            print('Wrong')
    pass

def customerLandingPage(customer):
    choice_actions = {
        1: go_shopping,
        2: check_profile,
        3: check_balance,
        4: exit_program
    }

    while(True):
        clearConsole()
        # display a welcome message and options for customer interactions
        print("Welcome, " + customer + "!")
        print("1. Go Shopping")
        print("2. Check Balance")
        print("3. Display user profile")
        print("4. Exit")

        choice = input("\n\n\n\t\t\t\t\t Enter your choice: ")

        try:
            choice = int(choice)
            if choice in choice_actions:
                choice_actions[choice]()
            else:
                print("Invalid choice. Please select a valid option (1-3).")
        except ValueError:
            print("Invalid input. Please enter a valid number.")
        
        input("\nPress Enter to continue...")
        #clearConsole()
