# Treasure Map

## Instructions
'''
You are going to write a program which will mark a spot with an X.
The map is made of 3 rows of blank squares.
     1     2      3
1 ["◻️", "◻️", "◻️"]
2 ["◻️", "◻️", "◻️"]
3 ["◻️", "◻️", "◻️"]

Your program should allow you to enter the position of the treaure
using a two-digit system. The first digit is the veritcal column number
and the second digit is the horizontal row number. e.g. :

Example Input
column 2, row 3 would be entered as:
23
     1     2      3
1 ["◻️", "◻️", "◻️"]
2 ["◻️", "◻️", "◻️"]
3 ["◻️", "X", "◻️"]

◻️
'''
# Don't change the code below
row1 = ["◻️", "◻️", "◻️"]
row2 = ["◻️", "◻️", "◻️"]
row3 = ["◻️", "◻️", "◻️"]
map = [row1, row2, row3]
print(f"{row1}\n{row2}\n{row3}")
position = input("Where do you want to put the treasure?\n")

# write your code below
row = int(position[0])-1
column = int(position[1])-1

map[row][column] = "X"

print(f"{row1}\n{row2}\n{row3}")

