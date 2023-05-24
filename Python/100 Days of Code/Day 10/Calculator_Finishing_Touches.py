# Combining Dictionaries and Functions

import os
from logo import art

def add(n1, n2):
    return n1 + n2 

def subtract(n1, n2):
    return n1 - n2

def multiply(n1, n2):
    return n1 * n2

def divide(n1, n2):
    return n1 / n2

operations = {
    '+': add, 
    '-': subtract,
    '*': multiply,-
    '/': divide,
}

def calculator():
    print(art)
    num1 = float(input("What's the first number?: "))
    for operand in operations:
        print(operand)
    again = True

    while again:
        operand = input("Pick an operation : ")
        num2 = float(input("What's the second number?: "))
        calculation_function = operations[operand]
        first_answer = calculation_function(num1, num2)

        print(f"{num1} {operand} {num2} = {first_answer}")

        try_again = input(f"Type 'y' to continue calculating with {first_answer}, or type 'n' to start again.: ")
        if try_again == 'y':
            num1 = first_answer
        else:
            again = False
            calculator()