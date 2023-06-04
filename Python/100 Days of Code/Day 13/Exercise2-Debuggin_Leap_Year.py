# Debugging leap year

## Instructions
'''
1. Read this code
2. Spot the problems
3. Modify the code to fix the program
4. No shortcuts-don't copy-paste to replace the code entirely with a working solution
'''


# year = input("Which year do you want to check?: ")        # this was the problem
year = int(input("Which year do you want to check?: "))     # this is the solution

if year % 4 == 0:
    if year % 100 == 0:
        if year % 400 == 0:
            print("Leap year.")
        else:
            print("Not leap year")
    else:
        print("Leap year.")
else:
    print("Not leap year") 

