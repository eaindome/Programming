# now solving the problem to find the 2020th
starting_numbers = [0, 3, 6]

numbers = starting_numbers.copy()
numbers.append(0)

turn = 0
turns = {}
previous_turn = 0
occurred_before = set()

while turn < 2019:  # Continue the game until the 2019th turn
    if turn < len(numbers):
        current_number = numbers[turn]
    else:
        current_number = numbers[-1]

    if current_number in occurred_before:
        previous_turn = None  # Initialize as None

        for turn_id, value in reversed(list(turns.items())):
            if value == current_number:
                if isinstance(turn_id, int):
                    previous_turn = turn_id
                    break
                try:
                    previous_turn = int(turn_id)
                except ValueError:
                    previous_turn = turn_id

        if previous_turn is not None:
            next_number = turn - previous_turn
            numbers.append(next_number)
        else:
            # If previous_turn is None, this is a new number
            next_number = 0
            numbers.append(next_number)

        if next_number != 0 and next_number not in occurred_before:
            # If next_number is new, add 0 after it
            numbers.append(0)
    else:
        occurred_before.add(current_number)

    turns[turn] = current_number
    turn += 1

result = numbers[-2]  # Get the 2020th number spoken

print(f"The 2020th number spoken is: {result}")


# it doesn't suit other tests well 🤣😂 
# next trial
