# Making a Hangman Game 5

import random

# TODO-1 
# Update the word list to use the 'word_list' from hangman_words.py
# Delete this line: word_list = ["ardvark", "baboon", "camel"]
from hangman_words import hangman_words
chosen_word = random.choice(hangman_words)
word_length = len(chosen_word)

end_of_game = False
lives = 6

# TODO-3 Import the logo from hangman_art.py and print it at the start of the game.
from hangman_art import logo
print(logo)

# Testing the code
print(f"Pssst, the solution is {chosen_word}")

# Create blanks
display = []
for let in range(word_length):
    display.append("_")

# Check guessed letter
while not end_of_game:
    position = 0
    guess = input("Guess a letter: ").lower()

    # TODO-4 
    # If the user has entered a letter they've akready guessed, print the letter and let them know
    if guess in display:
        print(f"You have already guessed this letter {guess}.")

    # Check guessed letter
    for letter in chosen_word:
        if letter == guess:
            display[position] = guess
            word_length -= 1
        position += 1

    # Check if user is wrong
    if  guess not in chosen_word:
        # TODO-5 If the letter is not in the chosen_word, print out the letter and let them know it's not in the word.
        print(f"{guess} is not in word.")
        lives -= 1
        if lives == 0:
            end_of_game = True
            print("You lose!")
    elif "_" not in display:
        end_of_game = True
        print("You win!")
    
    # Join all the elements in the list and turn it into a String
    print(f"{' '.join(display)}")
    #print(display)

    # TODO-2 Import the stages from hangman_art.py and make this error go away
    from hangman_art import stages
    print(stages[lives])
    
