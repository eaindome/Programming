import os
import time
from menu import MENU, resources

def report(resources, profit):
    print(f"Water: {resources['water']}ml")
    print(f"Milk: {resources['milk']}ml")
    print(f"Coffee: {resources['coffee']}g")
    print(f"Money: ${profit}")

def coin_value(quarters, dimes, nickles, pennies):
    coin_values = {'quarters': 0.25, 'dimes': 0.10, 'nickles': 0.05, 'pennies': 0.01}
    total_amount = sum(quantity * value for coin, value in coin_values.items() if (quantity := locals().get(coin)) is not None)
    return round(total_amount, 3)

def remaining_resource(resources, interest):
    ingredients = MENU[interest]['ingredients']
    resources['water'] -= ingredients['water']
    resources['milk'] -= ingredients['milk']
    resources['coffee'] -= ingredients['coffee']
    return resources

def enter_values():
    print("Please insert coins.")
    coins = {'quarters': 'How many quarters: ', 'dimes': 'How many dimes: ', 'nickles': 'How many nickles: ', 'pennies': 'How many pennies: '}
    total_amount = coin_value(**{coin: int(input(prompt)) for coin, prompt in coins.items()})

    if interest in ('espresso', 'latte', 'cappuccino'):
        change = total_amount - MENU[interest]['cost']
    else:
        change = 0

    return change

password = 'coffeemachine@enterprise'
worker = input("Are you a worker?\nEnter 'y' or 'n': ")
while worker not in ('y', 'n'):
    print("Kindly enter a correct value.")
    worker = input("Are you a worker?\nEnter 'y' or 'n': ")

if worker == 'y':
    while True:
        passwrd = input("Enter password to continue or 'quit' to exit to user: ")
        if passwrd == password:
            print("Enter 'report' to get the report and 'off' to quit the program.")
            time.sleep(5)
            break
        elif passwrd == 'quit':
            exit()
        else:
            print("Kindly enter a correct choice value.")
else:
    profit = 0

os.system('cls')
while True:
    interest = input("What would you like? (espresso/latte/cappuccino): ")
    if interest in ('espresso', 'latte', 'cappuccino', 'report', 'off'):
        if interest == 'report':
            report(resources, profit)
        elif interest == 'off':
            exit()
        else:
            if 'water' in MENU[interest]['ingredients'] and MENU[interest]['ingredients']['water'] > resources['water']:
                print("Sorry, there's not enough water.")
                change = 0
            elif 'milk' in MENU[interest]['ingredients'] and MENU[interest]['ingredients']['milk'] > resources['milk']:
                print("Sorry, there's not enough milk.")
                change = 0
            elif MENU[interest]['ingredients']['coffee'] > resources['coffee']:
                print("Sorry, there's not enough coffee.")
                change = 0
            else:
                change = enter_values()
                profit += MENU[interest]['cost']
                resources = remaining_resource(resources, interest)
                if change < 0:
                    print("Not enough money.")
                elif change > 0:
                    print(f"Here is ${change} in change.")
                    print(f"Here is your {interest} ☕. Enjoy!")
        continue
    else:
        print("Kindly enter a correct value!")
