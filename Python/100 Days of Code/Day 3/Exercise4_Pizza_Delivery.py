# Pizza Order

## Instructions
'''
Congratulations, you've got a job at Python Pizza.
Your first job is to build an automatic pizza order program.

Based on a user's order, work out their final bill.
Small Pizza: $15
Medium Pizza: $20
Large Pizza: $25
Pepperoni for Small Pizza: $2
Pepperoni for Medium or Large Pizza: $3
Extra Cheese for nay size pizza: $1

Example Input
size = "L"
add_pepperoni = "Y"
extra_cheese = "N"

Example Output
Your final bill is: $28
'''
# Don't change the code below
print("Welcome to Python Pizza Deliveries!")
size = input("What size pizza do you want? S, M, or L: ")
add_pepperoni = input("Do you want pepperoni? Y or N: ")
extra_cheese = input("Do you want extra cheese? Y or N: ")

# write your code below this line

bill = 0.00
if size == "S":
    if add_pepperoni == "Y":
        if extra_cheese == "Y":
            bill = 15 + 2 + 1 
        else:
            bill = 15 + 2
    else:
        if extra_cheese == "Y":
            bill = 15 + 1
        else:
            bill = 15

elif size == "M":
    if add_pepperoni == "Y":
        if extra_cheese == "Y":
            bill = 20 + 3 + 1
        else:
            bill = 20 + 3
    else:
        if extra_cheese == "Y":
            bill = 20 + 1
        else:
            bill = 20

elif size == "L":
    if add_pepperoni == "Y":
        if extra_cheese == "Y":
            bill = 25 + 3 + 1
        else:
            bill = 25 + 3
    else:
        if extra_cheese == "Y":
            bill = 25 + 1
        else:
            bill = 25

print(f"Your final bill is: ${bill}")

# Solution
bill = 0

if size == 'S':
    bill += 15
elif size == 'M':
    bill += 20
elif size == 'L':
    bill += 25

if add_pepperoni == 'Y':
    if size == 'S':
        bill += 2
    else:
        bill += 3

if extra_cheese == 'Y':
    bill += 1

print(f"Your final bill is: ${bill}")
