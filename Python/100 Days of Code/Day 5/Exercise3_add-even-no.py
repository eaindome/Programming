# Adding Evens 

## Instructions
'''
You are going to write a program that calculates the sum of all the even 
numbers from 1 to 100, includeing 1 and 100.

e.g.2 + 4 + 6 + 8 + ... + 99 + 100

Important: there should only be 1 print statement in your console output.
It should just print the final total and not every step of the calculation.

Hint:
1. There are quite a few ways of solving this problem, but you will need 
to use the range() function in any of the solution
'''
# write your code below
total = 0
for number in range(0,101,2):
    total+=number
print(f"The sum of all even numbers from 0 to 100 = {total}")

## OR
for number in range(1, 101):
    if number % 2 == 0:
        total += number
print(f"The sum of all even numbers from 0 to 100 = {total}")