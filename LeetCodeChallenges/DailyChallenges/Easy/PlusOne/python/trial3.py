digits = [1,2,3,4]
updated_digits = []

str_digits = [str(i) for i in digits]

joined_str_digits = ''.join(str_digits)

int_joined_str_digits = int(joined_str_digits)

int_joined_str_digits += 1

for digit in str(int_joined_str_digits):
    digit = int(digit)
    updated_digits.append(digit)

print(f"updated list: {updated_digits}")