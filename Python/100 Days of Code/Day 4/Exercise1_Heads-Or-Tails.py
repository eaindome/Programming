# Heads Or Tails

## Instructions
'''
You are going to write a virtual coin toss program. It will 
randomly tell the user "Heads" or "Tails".

Important, the first letter should be capitalised and spelt exactly like
in the example e.g. Heads, not heads.

There are many ways of doing this. But to practice what we learnt in the last lesson,
you should generate a random number, either 0 or 1. Then yse that number ot print out
Heads or Tails.

e.g 
1 means Heads
0 means Tails

# Hint:
Remember to import the random module first.
'''
# Write your code below
import random


choice = random.randint(0,1)

if choice == 1:
    print("Heads")
else:
    print("Tails")

