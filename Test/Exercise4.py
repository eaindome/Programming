## Variables

# Instructions
'''
Write a program that switches the values stored in the variables 
a and b.
Your program should work for different inputs. e.g. any value of a and b

Example Input
a = 1
b = 3

Example Output
a = 3
b = 1
'''

# Don't change the code below
a = input("a: ")
b = input("b: ")

# Write your code below this line

# create a temporary variable to store the value of a/b
temp = a
a = b
b = temp

# Write your code above this line

# Don't change the code below
print("a = " + a)
print("b = " + b)