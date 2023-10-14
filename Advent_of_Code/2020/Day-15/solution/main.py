# define the starting numbers provided in the puzzle input.
starting_numbers = [15, 5, 1, 4, 7, 0]

# create a copy of the starting numbers list to work with.
numbers = starting_numbers.copy()

# initialize the current turn to the number of starting numbers, 
# and last_spoken with the last starting number.
turn = len(starting_numbers)
last_spoken = starting_numbers[-1]

# create a dictionary to store the turns when numbers were spoken.
# this dictionary maps each spoken number to the turn it was last spoken.
# we initialize it with the starting numbers, excluding the last one.
spoken_turns = {number: i + 1 for i, number in enumerate(starting_numbers[:-1])}

# continue the game until we reach the 2020th turn.
while turn < 2020:
    # check if the last spoken number has been spoken before.
    if last_spoken in spoken_turns:
        # calculate the age of the last spoken number (how many turns ago it was spoken).
        age = turn - spoken_turns[last_spoken]
        # update the turn when the last spoken number was last spoken.
        spoken_turns[last_spoken] = turn
        # set the last spoken number to its age.
        last_spoken = age
    else:
        # if the last spoken number is new, add it to the dictionary.
        spoken_turns[last_spoken] = turn
        # set the last spoken number to 0.
        last_spoken = 0
    # append the last spoken number to the list of numbers spoken.
    numbers.append(last_spoken)
    # increment the turn counter.
    turn += 1

# get the result, which is the 2020th number spoken.
result = numbers[-1]
print(f"The 2020th number spoken is: {result}")
