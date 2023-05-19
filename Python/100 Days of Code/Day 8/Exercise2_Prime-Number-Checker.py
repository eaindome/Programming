# Prime Number Checker

## Instructions
'''
Prime numbers are numbers that can only be cleanly divided by itself and 1.

You need to write a function that checks whether if the number passed into it
is a prime number or not.
'''
# write your code below this line
def prime_checker(number):
    if number == 2 or number % 2 != 0:
        print(f"{number} is a prime number.")
    else:
        print(f"{number} is not a prime number.")
# write your code above this line

# solution
def prime_checker(number):
    is_prime = True
    for i in range(2, number):
        if number % i == 0:
            is_prime = False
    if is_prime:
        print(f"{number} is a prime number.")
    else:
        print(f"{number} is not a prime number.")
# solution 

# Do NOT change any of the code below
n = int(input("Check this number: "))
prime_checker(number=n)