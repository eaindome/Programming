import os
import time
from menu import Menu, MenuItem
from money_machine import MoneyMachine
from coffee_maker import CoffeeMaker


menu = Menu()
coffe_maker = CoffeeMaker()
money_machine = MoneyMachine()

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


while True:
    while True:
        interest = input(f"What would you like?\n{menu.get_items()}: ").lower()
        if interest in menu.get_items() or interest == 'report' or interest == 'off':
            break
        else:
            print("Kindly enter a correct value!")

    if interest == 'report':
            money_machine.report()
            coffe_maker.report()
    elif interest == 'off':
        break
    else:
        drink = menu.find_drink(interest)
        if drink != None:
            if coffe_maker.is_resource_sufficient(drink=drink) is True:
                if money_machine.make_payment(cost=drink.cost) is True:
                    coffe_maker.make_coffee(order=drink)
            else:
                coffe_maker.report()
    time.sleep(5)
    os.system('cls')


'''    
        if interest == 'espresso':
            Menu.find_drink(interest)
            if MENU[f'{interest}']['ingredients']['water'] > resources['water']:
                print("Sorry, there's not enough water.")
                change = 0
            elif MENU[f'{interest}']['ingredients']['coffee'] > resources['coffee']:
                print("Sorry, there's not enough coffee.")
                change = 0
            else:
                change = enter_values()''' 


'''
#if menu.name == 'espresso':
drink = 'espresso'
index = menu.menu.name.inde
print(index)
#print(menu.menu[0].name)'''
