# updated code for optimized memory usage

# the starting numbers
starting_numbers = [3,1,2]

# initialize variables
last_spoken = starting_numbers[-1]
turn = len(starting_numbers)
turns = {}

# play the game until the 30,000,000th turn
while turn < 30_000_000:
    if last_spoken in turns:
        age = turn - turns[last_spoken]
    else:
        age = 0

    turns[last_spoken] = turn
    last_spoken = age
    turn += 1

# The result is the last spoken number
result = last_spoken

print(f"The 30,000,000th number spoken is: {result}")
