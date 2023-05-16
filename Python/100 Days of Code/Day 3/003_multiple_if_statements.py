# Multiple If Statements
print("Welcome to the rollercoaster!")
height = float(input("Enter your height: "))
bill = 0
if height >= 120:
    print("You can ride the rollercoaster!")
    age = int(input("What is your age: "))
    if age < 12:
        bill += 5
        print("Child tickets are $5.")
    elif age <= 19:
        bill += 7
        print("Youth tickets are $7.")
    else:
        bill += 12
        print("Adult tickets are $12.")

    photo = input("Do you want a phot taken? Y or N: ")
    if photo == "Y":
        bill += 3
        print("Photo is $3")
else:
    print("Sorry, you have to grow taller before you can ride.")

print(f"Your final bill is ${bill}")


