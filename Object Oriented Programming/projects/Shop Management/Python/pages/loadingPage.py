from .ascii_art import landingPageArt, loadingPageArt
from .customerPage import customer_login, sign_up_customer
from utilities.utils import clearConsole, loadingBar, exit_program

# user functionalities
# worker login function
def worker_login():
    # worker login functionality
    pass

# sign up
def sign_up():
    sign_up_customer()

# function to display the loading page with ASCII art
def loadingPage():
    clearConsole()

    # "The CC Shop" ASCII art
    print("\n\n\n\n\n")
    print(loadingPageArt)
    print("\n")
    print("\n\t\t\t\t\t\t\tLoading...\n")
    print("\t\t\t\t\t\t", end='')

    # iterations = int(60*1000 / SLEEP_MS)
    loadingBar()

# function to display the landing page and get user input
def landingPage():
    choice_actions = {
        1: worker_login,
        2: customer_login,
        3: sign_up,
        4: exit_program
    }

    while True:
        clearConsole()

        # "Welcome ASCII art"
        #print("\n\n\n\n\n")
        print(f"\t\t\t\t{landingPageArt}")
        print("\n\n\n\n\t\t\t\t\t Login As : ")
        print("\n\n\n\t\t\t\t\t 1. Worker ")
        print("\n\n\t\t\t\t\t 2. Customer")
        print("\n\n\t\t\t\t\t 3. Sign Up")
        print("\n\n\t\t\t\t\t 4. Exit")
        choice = input("\n\n\n\t\t\t\t\t Enter your choice: ")

        #choice = input()
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








"""
Loading bar funcionalities
# 1. 
    spinner = ['-', '\\', '|', '/']
    iteration = 0

    for _ in range(BAR_WIDTH):
        print(spinner[iteration], end='')
        time.sleep(SLEEP_MS)
        print('\b', end='')              # Move the cursor back to the start of the spinner
        iteration = (iteration + 1) % 4

# 2.
    emptySymbol = chr(177)
    filledSymbol = chr(219)

    for i in range(BAR_WIDTH):
        print(emptySymbol, end='')
    print("\r\t\t\t\t\t", end='')

    for i in range(BAR_WIDTH):
        print(filledSymbol, end='')
        time.sleep(SLEEP_MS)

# 3. 
    for i in range(BAR_WIDTH):
            loading_bar = "\t\t\t\t\t[" + "#" * i + " " * (BAR_WIDTH - i) + "]"
            print(loading_bar, end='\r')
            time.sleep(SLEEP_MS)
    
"""



