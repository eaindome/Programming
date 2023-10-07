def find_first_invalid_number(numbers, preamble_length):
    preamble = numbers[:preamble_length]             # initialize preamble
    preamble_set = set(preamble)

    for i in range(preamble_length, len(numbers)):
        current_number = numbers[i]

        # check if number can be expressed as sum of 2 preamble numbers
        found = False
        for num in preamble:
            if (current_number-num) in preamble_set and current_number-num != num:
                found = True
                break

        if not found:
            return current_number

        # Update the preamble and preamble_set by 
        # removing the first number and adding the current number
        remove_number = preamble.pop(0)
        preamble_set.remove(remove_number)
        preamble.append(current_number)
        preamble_set.add(current_number)

def find_contiguous_set(invalid_number, numbers):
    left, right = 0, 0
    current_sum = numbers[0]

    while right < len(numbers):
        if current_sum == invalid_number:
            contiguous_set = numbers[left:right + 1]
            return min(contiguous_set), max(contiguous_set)
        elif current_sum < invalid_number:
            right += 1
            if right < len(numbers):
                current_sum += numbers[right]
        else:
            current_sum -= numbers[left]
            left += 1

def main():
    with open("./input.txt", "r") as file:
        numbers = [int(line.strip()) for line in file]

    preamble_length = 25
    invalid_number = find_first_invalid_number(numbers, preamble_length)
    #print(f"Invalid number: {invalid_number}")
    low, high = find_contiguous_set(invalid_number, numbers)
    print(f"Encryption weakness: {low+high}")

if __name__ == "__main__":
    main()