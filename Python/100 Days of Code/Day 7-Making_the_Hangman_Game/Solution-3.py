# Making a Hangman Game 3

import random
word_list = ["ardvark", "baboon", "camel"]
chosen_word = random.choice(word_list)
word_length = len(chosen_word)

# Testing the code
print(f"Pssst, the solution is {chosen_word}")

# Create blanks
display = []
for _ in range(word_length):
    display += "_"


# TODO-1 
# Use a while loop to let the uer guess again. The loop should only stoponce the user has guessed all theletters in the chosen word and 'display'
# has no more blanks ("_"). Then you can tell the user they've won.
end_of_game = False
while not end_of_game:
    guess = input("Guess a letter: ").lower()

    # Check guessed letter
    for position in range(word_length):
        letter = chosen_word[position]
        print(f"Current position: {position}\n"
            f"Current letter: {letter}\n"
            f"Guessed letter: {guess}")
        if letter == guess:
            display[position] = letter
    print(display)

    if "_" not in display:
        end_of_game = True
        print("You win")
