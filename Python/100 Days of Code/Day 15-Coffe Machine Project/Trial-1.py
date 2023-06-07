from menu import MENU, resources

def report(resources):
    money = 0
    print(f"Water: {resources['water']}ml\n"
          f"Milk: {resources['milk']}ml\n"
          f"Coffe: {resources['coffee']}g\n"
          f"Money: ${money}")

interest = input("What would you like? (espresso/latte/cappuccino): ")
if interest == 'report':
    report(resources)
else:
    print("Not done yet!")

espresso_cost = MENU['espresso']['cost']
latte_cost = MENU['latte']['cost']
cappuccino_cost = MENU['cappuccino']['cost']
print(f"Espresso: {espresso_cost}")
print(f"Latte: {latte_cost}")
print(f"Cappuccino: {cappuccino_cost}")

print("Please insert coins.")
quarters = int(input("How many quarters: "))
dimes = int(input("How many dimes: "))
nickles = int(input("How many nickles: "))
pennies = int(input("How many pennies: "))


quart = quarters * 0.25
dime = dimes * 0.10
nick = nickles * 0.05
penny = pennies * 0.01
total_amount = round((quart + dime + nick + penny), 3)

print(f"Total amount: {total_amount}")
print(f"Change: {total_amount - latte_cost}")







