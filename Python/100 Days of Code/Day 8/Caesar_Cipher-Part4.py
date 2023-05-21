# Caesar Cipher Part 3

# Don't change the code below
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
# TODO-1:
# Import and print the logo from art.py whenthe progrma starts
from art import logo
print(logo)



# TODO-2:
# What if the user enters a shift that is greater than the number of letters in the alphabet?
# Try running the program and entering a shift number of 45
# Hint: Think about how you can use the modulus (%)

# caesar function
def caesar(text, shift_amount, direction):
    words = ""
    for letter in text:
        if letter in alphabet:
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
        else:
            words += letter
    
    # TODO-3:
    # What happens if the user enters a number/symbol/space?
    # Can you fix the code to keep the number/symbol/space when the text is encoded/decoded?
    # e.g. start_text = "meet me at 3"
    # end_text = "**** ** ** 3"
    print(f"The {direction}d text is : {words}")

# TODO-4:
# Can you figure out a way to ask the user if they want to restart the cipher program?
# e.g. Type 'yes' if you want to go again. Otherwise type 'no;.
# If they type 'yes' then ask them for the direction/text/shift again and call teh caesar() function again?
# Hint: Try creating a new function that calls itself if they type 'yes'.

again = True
while again:
    direction = input("Type 'encode' to encrypt, type 'decode' to decrypt: \n")
    text = input("Type your message: \n")
    shift = int(input("Type the shift number: \n"))
    shift = shift % 26

    if direction == 'encode' or direction == 'decode':
        caesar(text=text, shift_amount=shift, direction=direction)
    else:
        print("Please tell us what you want to do. Try again")
    
    result = input("Type 'yes' if you want to go again. Otherwise type 'no'.\n")
    if result == 'no':
        again = False
        print('Good bye!')