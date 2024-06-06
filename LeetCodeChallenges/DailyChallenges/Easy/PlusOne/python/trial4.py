digits = [1, 2, 3, 5]

# Convert the list of digits to a string
updated_digits = [int(digits) for digits in str(int(''.join(map(str, digits))) + 1)]

# Return the list of integers
print(f"updated list: {updated_digits}")