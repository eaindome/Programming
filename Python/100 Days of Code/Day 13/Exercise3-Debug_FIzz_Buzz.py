# Debug Fizz Buzz Exercise

## Instructions
'''
1. Read this code
2. Spot the problems
3. Modify the code to fix the program
4. No shourtcuts-don't copy-paste to replace entirely with a 
    working 
The code needs to print the solution to the FizzBuzz game.
'''

for number in range(1, 101):
    # if number % 3 == 0 or number % 5 == 0:    # this was the 1st erro
    if number % 3 == 0 and number % 5 == 0:     # 1st solution
        print("FizzBuzz")
    #if number % 3 == 0:                        # 2nd problem
    elif number % 3 == 0:                       # 2nd's solution
        print("Fizz")
    #if number % 5 == 0:                        # 3rd problem
    elif number % 5 == 0:                       # 3rd's solution
        print("Buzz")
    else:
    #    print([number])                        # 4th problem
        print(number)                           # 4th's solution
