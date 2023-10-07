preamble_length = 5
num_set = (
    35, 20, 15, 25, 47, 40, 62, 55, 65, 95,
    102, 117, 150, 182, 127, 219, 299, 277, 309, 576
)

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

invalid_number = find_first_invalid_number(num_set, preamble_length)
print(f"Invalid number: {invalid_number}")
