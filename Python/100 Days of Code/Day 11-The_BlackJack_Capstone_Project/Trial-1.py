# The BlackJack Capstone Project

import random

def blackjack(user_score, computer_score):
    if user_score == 21:
        if Ace in user_cards:
           print('User has blackjack. User Wins!!!')
    elif computer_score == 21:
        if Ace in computer_cards:
            print("Computer has blackjack. Computer Wins!!!")
    else:
        return False
    
def scores():
    for card in range(len(user_cards)):
        user_score += user_cards[card]

    for card in range(len(computer_cards)):
        computer_score += computer_cards[card]

    return user_score, computer_score



Ace = 11
Jack = 10
Queen = 10
King = 10


cards = [Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King]

user_score = 0
user_cards = []

computer_score = 0
computer_cards = []

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
    '''
    if user_score == 21:
        if Ace in user_cards:
            print('User has blackjack. User Wins!!!')
    elif computer_score == 21:
        if Ace in computer_cards:
            print("Computer has blackjack. Computer Wins!!!")
    else:
        if user_score > 21:
            if Ace in user_cards:
                Ace = 1
                for card in range(len(user_cards)):
                    user_score += user_cards[0]
                if user_score > 21:
                    print("User Loses. Computer Wins!!!")
            else:
                print("User Loses. Computer Wins!!!")'''

    blackjack(user_score=user_score, computer_score=computer_score )

    if blackjack(user_score=user_score, computer_score=computer_score ) != False:
        end = True
    else:
        if user_score > 21:
            if Ace in user_cards:
                Ace = 1
                if Ace == 1 in user_cards:
                    for card in range(len(user_cards)):
                        user_score += user_cards[card]
                    if user_score > 21:
                        print("User Loses. Computer Wins !!!")
                else:
                    print("Change didn't work")
            else:
                print("User Loses. Computer Wins !!!")
        else:
            choice = input("Would you want to draw another card? Enter yes or no:\n").lower()
        

