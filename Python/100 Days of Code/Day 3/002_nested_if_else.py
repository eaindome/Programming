# Nested if/else statements

print("Welcome to the rooercoaster!")
height = float(input("What is your height in cm: "))
age = int(input("How old are you: "))

if height >= 120:
    print("You can ride the rollercoaster!")
    if age >= 18:
        print("You have to pay $12.00")
    elif age < 18:
        print("You have to pay $7.00")
    else:
        print("You have to pay $12.00")
else:
    print("You'll have to grow taller before you can ride.")
