# The BlackJack Capstone Project

import os
import random
from art import logo



def blackjack(user_cards, computer_cards):
    user_score = sum(user_cards)
    computer_score = sum(computer_cards)
    Ace = 11

    if user_score == 21:
        if Ace in user_cards:
           print('User has blackjack. User Wins!!!')
           return True
    elif computer_score == 21:
        if Ace in computer_cards:
            print("Computer has blackjack. Computer Wins!!!")
            return True
    return False
    

def BlackJack():
    print(logo)
    Ace = 11
    Jack = 10
    Queen = 10
    King = 10
    cards = [Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King]
    user_cards = []
    computer_cards = []


    for _ in range(2):
        user_choice = random.choice(cards)
        user_cards.append(user_choice)

    for _ in range(2):
        computer_choice = random.choice(cards)
        computer_cards.append(computer_choice)

    print("First Draw: ")
    print(f"User Cards: {user_cards}")
    print(f"Computer Cards: {computer_cards[0]}")

    user_score = sum(user_cards)
    computer_score = sum(computer_cards)

    game_over = False
    while not game_over:
        
        if blackjack(user_cards, computer_cards):
            game_over = True
        else:
            if user_score > 21:
                if Ace in user_cards:
                    user_cards.remove(Ace)
                    user_cards.append(1)
                    user_score = sum(user_cards)
                    if user_score > 21:
                        game_over = True
                else:
                    game_over = True
            else:
                while True:
                    choice = input("Would you want to draw another card? Enter yes or no:\n").lower()
                    if choice == 'no':
                        game_over = True
                        break
                    elif choice == 'yes':
                        user_choice = random.choice(cards)
                        user_cards.append(user_choice)
                        user_score = sum(user_cards)
                        print(f"User Cards: {user_cards}\nUser Score: {user_score}")
                        break
                    else:
                        print("Incorrect input. Please enter 'yes' or 'no'.")

    if user_score > 21:
        print(f"\nUser Cards: {user_cards}\nUser Score: {user_score}")
        print(f"Computer Cards: {computer_cards}\nComputer Score: {computer_score}\n")
        print("User Loses. Computer Wins !!!")
    else: 
        while computer_score < 17:
            computer_choice = random.choice(cards)
            computer_cards.append(computer_choice)
            computer_score = sum(computer_cards)

        print(f"\nUser Cards: {user_cards}\nUser Score: {user_score}")
        print(f"Computer Cards: {computer_cards}\nComputer Score: {computer_score}\n")

        if computer_score > 21:
            print("Computer Loses. User Wins !!!")
        else:
            if user_score > computer_score:
                print("Computer Loses. User Wins !!!")
            elif user_score < computer_score:
                print("User Loses. Computer Wins !!!")
            else:
                print("Its draw!!!")

    while True:
        play_again = input("Do you want to play again? Enter 'yes' or 'no':\n")
        if play_again == 'yes':
            os.system('cls')
            BlackJack()
            break
        elif play_again == 'no':
            print('Thank you for playing this game, hope you had fun!\nSee you again.')
            break
        else:
            print("Incorrect input. Please enter 'yes' or 'no' to start the game.")

def play_blackjack():
    while True:
        game = input("Enter 'Play' to play the blackjack game: ").lower()
        if game == 'play':
            os.system('cls')
            BlackJack()
            break
        else:
            print("Incorrect input. Please enter 'Play' or 'play' to start the game.")

play_blackjack()