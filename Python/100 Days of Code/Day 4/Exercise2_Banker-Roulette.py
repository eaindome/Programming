# Who's Paying

## Instructions
'''
You are going to write a program which will select a rondom name form a list of names.
The person selected will have to pay for everybody's food bill.

Important: You are not allowed to use the choice function

splits the string names_string into individual names and puts them inside a List called names. For this to work, 
you must enter all the names as name followed by comma then space.e.g. name, name, name

Example Input:
Angela, Ban, Jenny, Michael, Chloe

Example Output:
Michael is going to buy the meal today!

# Hint
1. You might need the help of the len() function
'''

# Don't change the code below
# Split string method
names_string = input("Give me eveybody's names, seperated by a comma.\n")
names = names_string.split(", ")

# write your code below this line
import random

random_name = names[random.randint(0, len(names)-1)]

print(f"{random_name} is going to buy the meal today!")


# using the 'choice' function
random_name = random.choice(names)
print(f"{random_name} is going to buy the meal today!")