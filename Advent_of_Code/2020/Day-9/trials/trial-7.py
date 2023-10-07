with open("./input.txt", "r") as file:
    numbers = [int(line.strip()) for line in file]

#num_set = set(numbers)
preamble_length = 5

def find_first_invalid_number(numbers, preamble_length):
    preamble = numbers[:preamble_length]            # initialize preamble
    preamble_set = set(preamble)

    for i in range(preamble_length, len(numbers)):
        current_number = numbers[i]

        
        found = False
        for num in preamble:
            if (current_number-num) in preamble_set and current_number-num != num:
                found = True
                break

        if not found:
            return current_number
        
        # Update the preamble and preamble_set by 
        # removing the first number and adding the current number
        removed_number = preamble.pop(0)
        preamble_set.remove(removed_number)
        preamble.append(current_number)
        preamble_set.add(current_number)

def find_contiguous_set(invalid_number, numbers):
    for start_index in range(len(numbers)):
        current_sum = 0
        for end_index in range(start_index, len(numbers)):
            current_sum += numbers[end_index]
            if current_sum == invalid_number:
                contiguous_set = numbers[start_index:end_index+1]
                return min(contiguous_set), max(contiguous_set)
            elif current_sum > invalid_number:
                break

invalid_number = find_first_invalid_number(numbers, preamble_length)
print(f"Invalid number: {invalid_number}")
low, high = find_contiguous_set(invalid_number, numbers)
print(f"Encryption weakness: {low+high}")