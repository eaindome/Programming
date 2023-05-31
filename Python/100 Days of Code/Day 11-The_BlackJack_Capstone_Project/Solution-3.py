import random

# Hint 4: Create a deal_card() function that uses the list below to *return* a random card.
# 11 is the Ace
def deal_card():
    ''' Returns a random card from the deck '''
    cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    card = random.choice(cards)
    return card

# Hint 6: Create a function called calculate_score() that takes a List of cards as input
# and returns the score.
# Look up the sum() function to help you do this
def calculate_score(cards):
    ''' Take a list of cards and return the score calculated from the cards'''

    # Hint 7: Inside calculate_score() check for a blackjack (a hand with only 2 cards: ace + 10)
    # and return 0 instead of the actual score. 0 will represent a blackjack in our game.
    if sum(cards) == 21 and len(cards) == 2:
        return 0
    
    # Hint 8: Inside calculate_score() check for an 11 (ace). If the score is already over 21,
    # remove the 11 and replace it with a 1. You might need to look up append() and remove()
    if 11 in cards and sum(cards) > 21:
        cards.remove(11)
        cards.append(1)
        
    return sum(cards)

# Hint 5: Deal the user and computer 2 cards each using deal_card()
user_cards = []
computer_cards = []
is_game_over = False

for _ in range(2):
    user_cards.append(deal_card())
    computer_cards.append(deal_card())


# Hint 9: Call calculate_score(). If the computer or the user has a blackjack (0) or if the
# user's score is over 21, then the game ends.
user_score = calculate_score(user_cards)
computer_score = calculate_score(computer_cards)
print(f"Your cards: {user_cards}; Your score: {user_score}")
print(f"Computer's first card: {computer_cards[0]}")

if user_score == 0 or computer_score == 0 or user_score > 21:
    is_game_over = True
