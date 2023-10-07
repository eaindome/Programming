with open("./input.txt", "r") as file:
    numbers = [int(line.strip()) for line in file]

#num_set = set(numbers)
preamble_length = 5

def is_valid_number(number, preamble):
    for i in range(len(preamble)):
        for j in range(i+1, len(preamble)):
            if preamble[i] + preamble[j] == number:
                return True
    return False

def find_first_invalid_number(numbers, preamble_length):
    for i in range(preamble_length, len(numbers)):
        if not is_valid_number(numbers[i], numbers[i - preamble_length:i]):
            return numbers[i]

invalid_number = find_first_invalid_number(numbers, preamble_length)
print(f"Invalid number: {invalid_number}")


# the final time complexity is approximately O((n - preamble_length) * preamble_length^2)
# making it more efficient -> trial 5