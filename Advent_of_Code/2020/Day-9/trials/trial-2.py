preamble = (
    35,
    20,
    15,
    25,
    47,
)
num_set = (
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
)

preamble_length = len(preamble)

def is_valid_number(number, preamble):
    for i in range(preamble_length):
        for j in range(i+1, preamble_length):
            if preamble[i] + preamble[j] == number:
                return True
    return False

for i in range(preamble_length, len(num_set)):
    if not is_valid_number(num_set[i], num_set[i - preamble_length:i]):
        print(f"Invalid number: {num_set[i]}")
        break
