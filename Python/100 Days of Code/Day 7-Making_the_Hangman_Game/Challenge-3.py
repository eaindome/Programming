# Making a Hangman Game 3

import random
word_list = ["ardvark", "baboon", "camel"]
chosen_word = random.choice(word_list)
word_length = len(chosen_word)

# Testing the code
print(f"Pssst, the solution is {chosen_word}")

# Create blanks
display = []
for let in range(word_length):
    display.append("_")

# TODO-1 
# Use a while loop to let the uer guess again. The loop should only stoponce the user has guessed all theletters in the chosen word and 'display'
# has no more blanks ("_"). Then you can tell the user they've won.

#guess = input("Guess a letter: ").lower()

# Check guessed letter
position = 0
while range(word_length):
    position = 0
    guess = input("Guess a letter: ").lower()
    for letter in chosen_word:
        if letter == guess:
            display[position] = guess
            word_length -= 1
        position += 1
    print(display)

print("You win")
