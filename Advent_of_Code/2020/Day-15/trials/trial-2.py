# not entirely correct

starting_numbers = [0, 3, 6]

numbers = starting_numbers.copy()

turn = len(starting_numbers)
turns = {}
occurred_before = set()

while turn < 2020:
    if turn < len(numbers):
        current_number = numbers[turn]
    else:
        current_number = numbers[-1]

    if current_number in occurred_before:
        previous_turn = None

        for turn_id, value in reversed(list(turns.items())):
            if value == current_number:
                previous_turn = turn_id
                break

        next_number = turn - previous_turn if previous_turn is not None else 0
    else:
        next_number = 0

    occurred_before.add(current_number)

    numbers.append(next_number)
    turns[turn] = current_number
    turn += 1

result = numbers[2019]
print(numbers)
print(f"The 2020th number spoken is: {result}")



