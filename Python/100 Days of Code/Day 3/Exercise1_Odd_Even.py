# Odd or Even

## Instructions
'''
Write a program that works out whether if a given number is an odd or
even number.
Even numbers can be divided by 2 with no remainder.
eg. 86 is even because 86 / 2 = 43

43 does not have any decimal places. Therefore the division is clean
eg. 59 is odd because 59/2 = 36.875

36.875 is not a whole number, it has decimal places. Therefore 
there is a remainder of 0.875, so the division is not clean.

The modulo is written as a percentage sign (%) in Python. It gives you
the remainder after a division.

Example Input
43 
94

Example Output
This is an odd number
This is an even number
'''

# Don't change the code below
number = int(input("Which number do you want to check: "))

# write your code below this line
if number % 2 == 0:
    print("This is an even number.")
else:
    print("This is an odd number.")

