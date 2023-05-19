# Caesar Cipher Part 3

# Don't change the code below
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

direction = input("Type 'encode' to encrypt, type 'decode' to decrypt: \n")
text = input("Type your message: \n")
shift = int(input("Type the shift number: \n"))
# Don't change the code above

# TODO-1:
# Combine the encrypt() and decrypt() functions into a single function called caesar()
def caesar(text, shift_amount, direction):
    words = ""
    for letter in text:
        position = alphabet.index(letter)
        if direction == 'encode':
            new_position = position + shift_amount
            new_letter = alphabet[new_position]
            words += new_letter 
        elif direction == 'decode':
            position = alphabet.index(letter)
            new_position = position - shift_amount
            new_letter = alphabet[new_position]
            words += new_letter

    print(f"The {direction}d text is : {words}")

# TODO-2:
# Call the caesar() function, passing over the 'text', 'shift', and 'direction' values
if direction == 'encode' or direction == 'decode':
    caesar(text=text, shift_amount=shift, direction=direction)
else:
    print("Please tell us what you want to do. Try again")