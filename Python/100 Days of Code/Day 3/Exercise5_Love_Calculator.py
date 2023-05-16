# Love Calculator

## Instructions
'''
You are going to write a program that tests the compatibility
between two people. We're going to use the super scientific method
recommended by BuzzFeed.

To work out the love score between two people:
    Take both people's names and check for the number of times the letters int
    the word TRUE occurs. Then check for the number of times the letters in the word 
    LOVE occurs. Then combine these numbers to make a 2 digit number.

    For Love Scores less than 10 or greater than 90, the message should be:
    "Your score is x, you go together like coke and mentos."

    For Love Scores between 40 and 50, the message should be:
    "Your score is y, you are alright together."

    Otherwise the message will just be thier score.eg.
    "Your score is z."

Hint:
1. The lower() function changes all the letters in a string to lower case
2. The count() function will give you the number of times a letter occurs in a string

Example Input:
name1 = "Brad Pitt"
name2 = "Jennifer Aniston"

Example Output:
Your score is 73
'''

# Don't changethe code below
print("Welcome to the Love Calculator!")
name1 = input("What is your name? \n")
name2 = input("What is their name? \n")

# write your code below this line

name1_lower = name1.lower()
name2_lower = name2.lower()

name = name1_lower + name2_lower 

t = name.count("t")
r = name.count("r")
u = name.count("u")
e = name.count("e")

true = t + r + u + e

l = name.count("l")
o = name.count("o")
v = name.count("v")

love = l + o + v + e

true_love = str(true) + str(love)
tl = int(true_love)

if tl <= 10 or tl >= 90:
    print(f"Your score is {tl}, you go together like coke and mentos.")
elif tl >= 40 and tl <= 50:
    print(f"Your score is {tl}, you are alright together.")
else:
    print(f"Your score is {tl}")