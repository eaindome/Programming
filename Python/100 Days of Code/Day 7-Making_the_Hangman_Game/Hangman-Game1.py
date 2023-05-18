# Hangman Game 

import random
from hangman_art import logo, stages
from hangman_words import hangman_words

chosen_word = random.choice(hangman_words)
word_length = len(chosen_word)

end_of_game = False
lives = 6
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

    print(stages[lives])