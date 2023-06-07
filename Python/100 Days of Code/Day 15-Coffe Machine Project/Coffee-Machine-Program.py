import os
import time
from menu import MENU, resources

def report(resources, profit):
    print(f"Water: {resources['water']}ml\n"
          f"Milk: {resources['milk']}ml\n"
          f"Coffe: {resources['coffee']}g\n"
          f"Money: ${profit}")
    
def coin_value(quarters, dimes, nickles, pennies):
    quart = quarters * 0.25
    dime = dimes * 0.10
    nick = nickles * 0.05
    penny = pennies * 0.01
    return round((quart + dime + nick + penny), 3)

def remaining_resource(resources, interest, MENU):
    resources['water'] = resources['water'] - MENU[f'{interest}']['ingredients']['water']
    resources['milk'] = resources['milk'] - MENU[f'{interest}']['ingredients']['milk']
    resources['coffee'] = resources['coffee'] - MENU[f'{interest}']['ingredients']['coffee']
    return resources

def enter_values():
    print("Please insert coins.")
    quarters = int(input("How many quarters: "))
    dimes = int(input("How many dimes: "))
    nickles = int(input("How many nickles: "))
    pennies = int(input("How many pennies: "))
    total_amount = coin_value(quarters, dimes, nickles, pennies)

    if interest == 'espresso':
        change = total_amount - espresso_cost
    elif interest == 'latte':
        change = total_amount - latte_cost
    elif interest == 'cappuccino':
        change = total_amount - cappuccino_cost

    return change

password = 'coffeemachine@enterprise'
while True:
    worker = input("Are you a worker?\nEnter 'y' or 'n': ").lower()
    if worker == 'y':
        while True:
            passwrd = input("Enter password to continue or 'quit' to exist to user: ")
            if passwrd == password:
                print("Enter 'report' to get the report and 'off' to quit the program.")
                time.sleep(5)
                break
            elif passwrd == 'quit':
                break
            else:
                print("Kindly enter a correct choice value.")
        break
    elif worker == 'n':
        break
    else:
        print("Kindly enter a correct value.")

os.system('cls')
profit = 0
espresso_cost = MENU['espresso']['cost']
latte_cost = MENU['latte']['cost']
cappuccino_cost = MENU['cappuccino']['cost']

while True:
    while True:
        interest = input("What would you like? (espresso/latte/cappuccino): ").lower()
        if interest == 'espresso' or interest == 'latte' or interest == 'cappuccino' or interest == 'report' or interest == 'off':
            break
        else:
            print("Kindly enter a correct value!")

    if interest == 'report':
            report(resources, profit)
    elif interest == 'off':
        break
    else:
        if interest == 'espresso':
            if MENU[f'{interest}']['ingredients']['water'] > resources['water']:
                print("Sorry, there's not enough water.")
                change = 0
            elif MENU[f'{interest}']['ingredients']['coffee'] > resources['coffee']:
                print("Sorry, there's not enough coffee.")
                change = 0
            else:
                change = enter_values()       
        elif MENU[f'{interest}']['ingredients']['water'] > resources['water']:
            print("Sorry, there's not enough water.")
            change = 0
        elif MENU[f'{interest}']['ingredients']['milk'] > resources['milk']:
            print("Sorry, there's not enough milk.")
            change = 0
        elif MENU[f'{interest}']['ingredients']['coffee'] > resources['coffee']:
            print("Sorry, there's not enough coffee.")
            change = 0
        else:
            change = enter_values()
            
    if change < 0:
        print("Sorry, there's not enough money. Money refunded")
    elif change > 0:
        profit = MENU[f'{interest}']['cost']
        resource = remaining_resource(resources, interest, MENU)
        print(f"Here is ${change} in change\n"
            f"Here is your {interest} ☕. Enjoy!")





