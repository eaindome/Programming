# Debug Odd or Even

## Instructions
'''
    1. Read this code
    2. Spot the problems
    3. Modify the code to fix the program
Fix the code so that it works and passes the tests when you submit
'''

number = int(input("Which number do you want to check?: "))

# if number % 2 = 0:                    # this was the problem
if number % 2 == 0:                     # this is the solution
    print("This is an even number.")
else:
    print("This is an odd number.")