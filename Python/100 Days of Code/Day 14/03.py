# Higher or Lower

import os
from random import randint
from art import logo, vs
from game_data import data

# a function that takes the user input, compares 2 scores and returns either 'True' or 'False'
def followers(more_follows, score_A, score_B):
    if more_follows == 'a' and (score_A > score_B):
        return True
    elif more_follows == 'b' and (score_B > score_A):
        return True
    else:
        return False

# retrieving the number of items in our dataset
num_celebrity = len(data) - 1

# picking a random number
celeb_A = randint(0, num_celebrity)

game_over = False
while not game_over:
    # pick another random number
    celeb_B = randint(0, num_celebrity)

    # if both random numbers are the same, change the second one
    if celeb_A == celeb_B:
        celeb_B = randint(0, num_celebrity)

    # comparing one celebrity to the other statements
    print(f"Compare A: {data[celeb_A]['name']}, {data[celeb_A]['description']}, {data[celeb_A]['country']}") 
    # vs
    print(f"Against B: {data[celeb_B]['name']}, {data[celeb_B]['description']}, {data[celeb_B]['country']}") 

    # retrieve the scores for both numbers
    score_A = data[celeb_A]['follower_count']
    score_B = data[celeb_B]['follower_count']
    print(score_A, score_B)


    while True:                                 # to ensure user enter's correct value
        # check the scores and compare them
        more_follows = input("Who has more followers?\nType 'A' or 'B': ").lower()
        if more_follows == 'a' or more_follows == 'b':
            break
        else:
            print("Kindly enter either 'A' or 'B'")

    # check the scores and compare them
    result = followers(more_follows=more_follows, score_A=score_A, score_B=score_B)
    if result is True:
        # restart
        print("You win!")
        celeb_A = celeb_B
    else:
        # end
        print("You lose")
        game_over = True