import os
from art import logo, vs
from random import choice
from game_data import data

def format_data(account):
    '''Format the account data into printable format.'''
    account_name = account['name']
    account_descr = account['description']
    account_country = account['country']
    return f"{account_name}, a {account_descr}, from {account_country}"

def check_answer(guess, a_followers, b_followers):
    '''Take the user guess and follower counts and return if they got it right'''
    ## Use if statement to check if user is correct.
    if a_followers > b_followers:
        return guess == "a"
    else:
        return guess == "b"

# Display art
print(logo)

# score keeping
score = 0

# flag
game_should_continue = True
account_b = choice(data)

# make the game repeatable
while game_should_continue:

    # Generate a random account from the game data.
    account_a = account_b
    
    while account_a == account_b:
        account_b = choice(data)

    print(f"Compare A: {format_data(account_a)}")
    print(vs)
    print(f"Compare B: {format_data(account_b)}")

    # Ask user for a guess.
    guess = input("Who has more followers? Type 'A' or 'B': ").lower()

    # Check if user is correct.
    ## Get follower count of each account.
    a_follower_count = account_a["follower_count"]
    b_follower_count = account_b["follower_count"]

    is_correct = check_answer(guess, a_follower_count, b_follower_count)

    # Clear the screen in between rounds
    os.system('cls')
    print(logo)

    # Give user feedback on their guess.
    if is_correct:
        score += 1
        print(f"You're right! Current score: {score}")
    else:
        print(f"Sorry, that's wrong. Final score: {score}\n")
        game_should_continue = False


