import os
import time
from menu import MENU, resources

def report(resources, profit):
    print("Water: {}ml".format(resources['water']))
    print("Milk: {}ml".format(resources['milk']))
    print("Coffee: {}g".format(resources['coffee']))
    print("Money: ${}".format(profit))

def coin_value(coins):
    coin_values = {'quarters': 0.25, 'dimes': 0.10, 'nickles': 0.05, 'pennies': 0.01}
    total_amount = sum(quantity * coin_values[coin] for coin, quantity in coins.items())
    return round(total_amount, 3)

def remaining_resource(resources, interest):
    ingredients = MENU[interest]['ingredients']
    resources['water'] -= ingredients['water']
    resources['milk'] -= ingredients['milk']
    resources['coffee'] -= ingredients['coffee']
    return resources

def enter_values():
    print("Please insert coins.")
    coins = {'quarters': 0, 'dimes': 0, 'nickles': 0, 'pennies': 0}
    for coin in coins:
        coins[coin] = int(input("How many {}? ".format(coin)))
    total_amount = coin_value(coins)

    if interest in ('espresso', 'latte', 'cappuccino'):
        change = total_amount - MENU[interest]['cost']
    else:
        change = 0

    return change

password = 'coffeemachine@enterprise'
worker = input("Are you a worker? Enter 'y' or 'n': ")

while worker not in ('y', 'n'):
    print("Kindly enter a correct value.")
    worker = input("Are you a worker? Enter 'y' or 'n': ")

if worker == 'y':
    while True:
        passwrd = input("Enter the password to continue or 'quit' to exit to user: ")
        if passwrd == password:
            print("Enter 'report' to get the report and 'off' to quit the program.")
            time.sleep(5)
            break
        elif passwrd == 'quit':
            exit()
        else:
            print("Kindly enter a correct password.")
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
                    print("Here is ${} in change.".format(change))
                    print("Here is your {} ☕. Enjoy!".format(interest))
        continue
    else:
        print("Kindly enter a correct value!")
