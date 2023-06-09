import random

# Hint 4: Create a deal_card() function that uses the list below to *return* a random card.
# 11 is the Ace
def deal_card():
    ''' Returns a random card from the deck '''
    cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    card = random.choice(cards)
    return card

# Hint 5: Deal the user and computer 2 cards each using deal_card()
user_cards = []
computer_cards = []

for _ in range(2):
    user_cards.append(deal_card())
    computer_cards.append(deal_card())

# Hint 6: Create a function called calculate_score() that takes a List of cards as input
# and returns the score.
# Look up the sum() function to help you do this
'''
def calculate_score(cards):
    return sum(cards)
'''

# Hint 7: Inside calculate_score() check for a blackjack (a hand with only 2 cards: ace + 10)
# and return 0 instead of the actual score. 0 will represent a blackjack in our game.
'''
def calculate_score(cards):
    if sum(cards) == 21 and len(cards) == 2:
        return 0
    return sum(cards)
'''

# Hint 8: Inside calculate_score() check for an 11 (ace). If the score is already over 21,
# remove the 11 and replace it with a 1. You might need to look up append() and remove()

def calculate_score(cards):
    if sum(cards) == 21 and len(cards) == 2:
        return 0
    if 11 in cards and sum(cards) > 21:
        cards.remove(11)
        cards.append(1)
        
    return sum(cards)

