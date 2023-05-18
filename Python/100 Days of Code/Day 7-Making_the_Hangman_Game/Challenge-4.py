# Making a Hangman Game 3

import random

stages = ['''
    +---+
    |   |
    O   |
   /|\  |
   / \  |
        |
===========
''', '''
    +---+
    |   |
    O   |
   /|\  |
   /    |
        |
===========
''', '''
    +---+
    |   |
    O   |
   /|\  |
        |
        |
===========
''', '''
    +---+
    |   |
    O   |
   /|   |
        |
        |
===========
''', '''
    +---+
    |   |
    O   |
   /    |
        |
        |
===========
''', '''
    +---+
    |   |
    O   |
        |
        |
        |
===========
''', '''
    +---+
    |   |
        |
        |
        |
        |
===========
''']

end_of_game = False
word_list = ["ardvark", "baboon", "camel"]
chosen_word = random.choice(word_list)
word_length = len(chosen_word)

# TODO-1 
# Create a variable called 'lives' to keep track of the number of lives left
# Set 'lives' to equal 6
lives = 6

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
    for letter in chosen_word:
        if letter == guess:
            display[position] = guess
            word_length -= 1
        position += 1
    
    # TODO-2 
    # If guess is not a letter in the chosen_word, then reduce 'lives' by 1.
    # If lives goes down to 0, then the game should stop and it should print "You lose."
    if not guess in chosen_word:
        lives -= 1
        if lives == 0:
            end_of_game = True
            print("You lose")
    elif "_" not in display:
        end_of_game = True
        print("You win")

    print(display)
    # Join all the elements in the list and turn it into a String
    print(f"{' '.join(display)}")

    # TODO-3 
    # print the ASCII art from 'stages' that corresponds to the current number of 'lives'
    # the user has remaining 
    print(stages[lives])

#print("You win")