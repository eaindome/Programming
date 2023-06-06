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

def high_low():
    print(logo)

    # retrieving the number of items in our dataset
    num_celebrity = len(data) - 1

    # picking a random number
    celeb_A = randint(0, num_celebrity)

    score = 0               # score starting from 0
    game_over = False       # game over starting from False
    while not game_over:
        # pick another random number
        celeb_B = randint(0, num_celebrity)

        # if both random numbers are the same, change the second one
        if celeb_A == celeb_B:
            celeb_B = randint(0, num_celebrity)
        
        # comparing one celebrity to the other statements
        print(f"Compare A: {data[celeb_A]['name']}, {data[celeb_A]['description']}, {data[celeb_A]['country']}") 
        print(vs)
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

        os.system('cls')        # clear the screen
        print(logo)             # print the logo
        if result is True:
            score += 1                                         # increase the score
            print(f"You're right! Current score: {score}.")
            celeb_A = celeb_B                                  # change the value of celeb A to that of B
        else:
            print(f"Sorry, that's wrong. Final score: {score}")
            game_over = True
            os.system('cls')                                   # end the game

while True:                                                                     # error handling
    again = input("Do you want to play again?\nEnter 'y' or 'n': ").lower()
    if again == 'y':
        while True:                                                             # error handling
            os.system('cls')
            play = input("Enter 'start' to play 'The Higher or Lower Game': ").lower()
            if play == 'start':
                # call the games' function
                os.system('cls')
                high_low()
            else:
                # prompt the user to re-enter the correct value of choice
                print("Kindly enter 'start' to play the game\n")
    else:
        print("Good bye!...")