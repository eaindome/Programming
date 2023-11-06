import os
import time

BAR_WIDTH = 40
SLEEP_MS = 0.2

# function to clear the console screen
def clearConsole():
    os.system('cls' if os.name == 'nt' else 'clear')

# function for loading bar
def loadingBar():
    bar_length = BAR_WIDTH
    for i in range(bar_length + 1):
        progress = i / bar_length
        block = "#" * int(bar_length * progress)
        spaces = " " * (bar_length - len(block))
        loading_bar = f"\t\t\t\t\t[{block}{spaces}]"
        print(loading_bar, end='\r')
        time.sleep(SLEEP_MS)
        if i < bar_length:
            # Clear the previous line
            print("\033[K", end='\r')

# exit program functionality
def exit_program():
    clearConsole()
    print("\t\t\n\n\n\n\n\n\n\t\t\t\t\t\t\tGoodbye", end=' ')
    for i in range(4):
        time.sleep(1)
        print(".", end=' ')
    exit(0)

def startOver(landing_page_callback):
    #landing_page_callback()
    pass