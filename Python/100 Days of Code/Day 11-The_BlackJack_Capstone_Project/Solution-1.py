
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
