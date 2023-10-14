# modified and refined in trial 3
starting_numbers = [0,3,6]

# since the last number in the list will be the first
# time it was spoken, the next number will automatically be '0'
numbers = starting_numbers
numbers.append(0)

turn = 0
turns = {}
previous_turn = 0
occurred_before = set()
#current_number = numbers[0]

#print(numbers)
while turn < 11:
    print(f"turn : {turn}")
    print(f"Numbers 1: {numbers}")
    
    if turn < len(numbers):
        current_number = numbers[turn]
    else:
        current_number = numbers[-1]  # Get the last number in the list
    print(f"current number: {current_number}")
    if current_number in occurred_before:
        #print(f"Here works 1: {True}")
        for turn_id, value in reversed(list(turns.items())):
            if value == current_number:
                #print(f"Here works 2: {True}")
                if isinstance(turn_id, int):
                    previous_turn = turn_id
                    break
                try:
                    previous_turn = int(turn_id)
                except ValueError:
                    previous_turn = turn_id
        print(f"For turn {turn}: previous_turn = {previous_turn}")
        #print(f"Here works 3: {True}")
        next_number = turn - previous_turn
        numbers.append(next_number)
        #print(f"Numbers1: {numbers}")
    else:
        occurred_before.add(current_number)
    turns[turn] = current_number
    print(f"Numbers 2: {numbers}\n"
        f"len of numbers: {len(numbers)}\n")
    if turn > 10:
        break

    turn += 1

if numbers[0] in occurred_before:
    print(f"\nCheck: {True}")

print(f"Occurred before: {occurred_before}")
print(f"Numbers: {numbers}")
print(f"num turns: {turn}\n"
      f"turns: {turns}")

'''
how turns dictionary will be like
turns = {
    1: 0,
    2: 3, 
    3: 6
}
'''

# move to trial 2 if encounter error


