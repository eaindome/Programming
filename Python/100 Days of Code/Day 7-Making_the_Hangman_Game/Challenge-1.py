# Making a Hangman Game 1

# Step 1
import random
word_list = ["ardvark", "baboon", "camel"]

# TODO-1 
# Randomly choose a word fromthe word_list and assign it to a variable called chosen_word.
chosen_word = random.choice(word_list)

# TODO-2 
# Ask the user to guess a letter and assign their answer to a variable called guess. Make guess lowercase.
guess = input("Guess a letter: ").lower()

# TODO-3 
# Check if the letter the user guessed (guess) is one of the letters in the chosen_word.
word_length = len(chosen_word)

for let in range(word_length):
    if guess == chosen_word[let]:
        print("Right")
    else:
        print("Wrong")
print(chosen_word)



# a different solution for TODO-3
for letter in chosen_word:
    if letter == guess:
        print("Right")
    else:
        print("Wrong")