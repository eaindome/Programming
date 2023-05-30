# The BlackJack Capstone Project

import os
import random
from art import logo


def blackjack(user_score, computer_score):
    if user_score == 21:
        if Ace in user_cards:
           print('User has blackjack. User Wins!!!')
    elif computer_score == 21:
        if Ace in computer_cards:
            print("Computer has blackjack. Computer Wins!!!")
    else:
        return False
    
Ace = 11
Jack = 10
Queen = 10
King = 10
cards = [Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King]

user_score = 0
user_cards = []

computer_score = 0
computer_cards = []


def BlackJack():
    print(logo)
    while len(user_cards) < 2:
        user_choice = random.choice(cards)
        user_cards.append(user_choice)

    while len(computer_cards) < 2:
        computer_choice = random.choice(cards)
        computer_cards.append(computer_choice)

    print(user_cards)
    print(computer_cards)

    draw_again = True
    while draw_again:
        user_score = 0
        for card in range(len(user_cards)):
            user_score += user_cards[card]

        computer_score = 0
        for card in range(len(computer_cards)):
            computer_score += computer_cards[card]

        blackjack(user_score=user_score, computer_score=computer_score )

        if blackjack(user_score=user_score, computer_score=computer_score ) == True:
            draw_again = False
        else:
            if user_score > 21:
                if Ace in user_cards:
                    Ace = 1
                    if Ace == 1 in user_cards:
                        for card in range(len(user_cards)):
                            user_score += user_cards[card]
                        if user_score > 21:
                            #print(f"User Cards: {user_cards}\nUser Score: {user_score}")
                            #print("User Loses. Computer Wins !!!")
                            draw_again = False
                    else:
                        print("Change didn't work")
                        print(f"User Cards: {user_cards}\nUser Score: {user_score}")
                        draw_again = False
                else:
                    #print(f"User Cards: {user_cards}\nUser Score: {user_score}")
                    #print("User Loses. Computer Wins !!!")
                    draw_again = False
            else:
                choice = input("Would you want to draw another card? Enter yes or no:\n").lower()
                if choice == 'no':
                    draw_again = False
                else:
                    user_choice = random.choice(cards)
                    user_cards.append(user_choice)

    while computer_score < 17:
        computer_choice = random.choice(cards)
        computer_cards.append(computer_choice)
        computer_score = 0
        for card in range(len(computer_cards)):
            computer_score += computer_cards[card]

    if computer_score > 21:
        print(f"User Cards: {user_cards}\nUser Score: {user_score}")
        print(f"Computer Cards: {computer_cards}\nComputer Score: {computer_score}")
        print("Computer Loses. User Wins !!!")
    else:
        if user_score > computer_score:
            print(f"User Cards: {user_cards}\nUser Score: {user_score}")
            print(f"Computer Cards: {computer_cards}\nComputer Score: {computer_score}")
            print("Computer Loses. User Wins !!!")
        elif user_score < computer_score:
            print(f"User Cards: {user_cards}\nUser Score: {user_score}")
            print(f"Computer Cards: {computer_cards}\nComputer Score: {computer_score}")
            print("User Loses. Computer Wins !!!")
        else:
            print(f"User Cards: {user_cards}\nUser Score: {user_score}")
            print(f"Computer Cards: {computer_cards}\nComputer Score: {computer_score}")
            print("Its draw!!!")

    play_again = input("Do you want to play again? Enter 'yes' or 'no':\n")
    if play_again == 'yes':
        os.system('cls')
        BlackJack()
    else:
        print('Thank you for playing this game, hope you had fun!\nSee you again.')

game = input("Enter 'Play' to play the black jack game: ").lower()
if game == 'play':
    BlackJack()
