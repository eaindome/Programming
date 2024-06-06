digits = [1,2,3, 4]

# Convert the list of digits to a string
str_digits = [str(i) for i in digits]
# print(f"str_digits: {str_digits}")

# Join the list of digits to form a string
joined_str_digits = ''.join(str_digits)
# print(f"joined_str_digits: {joined_str_digits}")

# Convert the string to an integer
int_joined_str_digits = int(joined_str_digits)

# Add 1 to the integer
int_joined_str_digits += 1

# Convert the integer to a string
str_int_joined_str_digits = str(int_joined_str_digits)

# Convert the string to a list of characters
char_str_int_joined_str_digits = [char for char in str_int_joined_str_digits]

# Convert the list of characters to a list of integers
result = [int(char) for char in char_str_int_joined_str_digits]

# Return the list of integers
print(f"result: {result}")

# result = [int(i) for i in str(int(''.join([str(i) for i in digits])) + 1)]
# print(result)

