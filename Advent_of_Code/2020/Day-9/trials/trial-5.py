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

invalid_number = find_first_invalid_number(numbers, preamble_length)
print(f"Invalid number: {invalid_number}")


# time complexity reduced to O(n)