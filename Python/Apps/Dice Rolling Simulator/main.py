# Dice Rolling Simulator

# import random
# define a function to roll teh dice
# create a dictionary that will have the drawings of the dice
# loop until user quits

import random
from art import dice_drawings

def roll_dice():

    roll = input("Roll the dice? (Yes/No): ")
    while roll.lower() == "Yes".lower():
        dice1 = random.randint(1, 6)
        dice2 = random.randint(1, 6)

        print(f"dice rolled: {dice1} and {dice2}")
        print("\n".join(dice_drawings[dice1]))
        print("\n".join(dice_drawings[dice2]))

        roll = input("Roll again? (Yes/No): ")

roll_dice()