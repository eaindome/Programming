# The input string in camel case format
s = "saveChangesInTheEditor"

# Initialize the word count to 1. This is because the first word in a camel case string starts with a lowercase letter.
count_word = 1

# Iterate over each character in the string
for i in s:
    # If the character is uppercase, it indicates the start of a new word in a camel case string.
    if i.isupper():
        # So, increment the word count
        count_word += 1

# Print the total number of words in the camel case string
print(f"Number of words: {count_word}")