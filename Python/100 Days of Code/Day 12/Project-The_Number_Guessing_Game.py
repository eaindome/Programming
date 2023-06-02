# The Number Guessing Game
import random
from art import logo

print(logo)
print("Welcome to the Number Guessing Game!")

def guessing_game():
    lives = 0
    number = random.randint(1, 100)
    print("I'm thinking of a number between 1 and 100.")
    while True:
        difficulty = input("Choose a difficulty. Type 'easy' or 'hard': ")
        if difficulty == 'easy':
            lives = 10
            print(f"You have {lives} attempts remaining to guess the number.")
            break
        elif difficulty == 'hard':
            lives = 5
            print(f"You have {lives} attempts remaining to guess the number.")
            break
        else:
            print("Kindly enter either 'easy' or 'hard' to play.")

    # print(number)
    while lives > 0:
        guess = int(input("Make a guess: "))
        if guess == number:
            print(f"You got it! The answer was {number}")
            break
        else:
            if lives == 0:
                print(f"You have no lives left. Try again")
            elif guess < number:
                lives -= 1
                print(f"Too low.\nGuess again.\nYou have {lives} attempts remaining to guess the number.")
            elif guess > number:
                lives -= 1
                print(f"Too high.\nGuess again.\nYou have {lives} attempts remaining to guess the number.")
            else:
                return "error"
            
guessing_game()        

