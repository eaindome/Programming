# Caesar Cipher 1

alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

from art import logo
print(logo)

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
    
    print(f"The {direction}d text is : {words}")

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