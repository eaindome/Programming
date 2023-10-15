# simplifying the code for efficiency
starting_numbers = [0,3,6]
numbers = starting_numbers.copy()

turn = len(starting_numbers) # start with the turn after the last starting number
last_spoken = starting_numbers[-1]
spoken_turns = {number: i + 1 for i, number in enumerate(starting_numbers[:-1])}

while turn < 30000000:          # continue the game until the 2020th turn
    if last_spoken in spoken_turns:
        age = turn - spoken_turns[last_spoken]
        spoken_turns[last_spoken] = turn
        last_spoken = age
    else:
        spoken_turns[last_spoken] = turn
        last_spoken = 0
    numbers.append(last_spoken)
    turn += 1

result = numbers[-1]
print(f"The 30000000th number spoken is: {result}")