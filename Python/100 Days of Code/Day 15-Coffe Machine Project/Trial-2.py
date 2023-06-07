from menu import MENU, resources

def report(resources):
    money = 0
    print(f"Water: {resources['water']}ml\n"
          f"Milk: {resources['milk']}ml\n"
          f"Coffe: {resources['coffee']}g\n"
          f"Money: ${money}")
    
def coin_value(quarters, dimes, nickles, pennies):
    quart = quarters * 0.25
    dime = dimes * 0.10
    nick = nickles * 0.05
    penny = pennies * 0.01
    return round((quart + dime + nick + penny), 3)

espresso_cost = MENU['espresso']['cost']
latte_cost = MENU['latte']['cost']
cappuccino_cost = MENU['cappuccino']['cost']
#print(f"Espresso: {espresso_cost}")
#print(f"Latte: {latte_cost}")
#print(f"Cappuccino: {cappuccino_cost}")

interest = input("What would you like? (espresso/latte/cappuccino): ")
if interest == 'report':
    report(resources)
else:
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
    
    if change < 0:
        print("Not enough money.")
    else:
        print(f"Here is ${change} in change\n"
              f"Here is your {interest} ☕. Enjoy!")
