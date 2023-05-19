# Caesar Cipher 1

# Don't change the code below
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

direction = input("Type 'encode' to encrypt, type 'decode' to decrypt: \n")
text = input("Type your message: \n")
shift = int(input("Type the shift number: \n"))
# Don't change the code above

# TODO-1: 
# Create a function called 'encrypt' that takes the 'text' and 'shift' as inputs.
def encrypt(text, shift):
    # TODO-2:
    # Inside the 'encrypt' function, shift each letter of the 'text' forwards in
    # the alphabet by the shift amount and print the encrypted test.
    # e.g.
    # plain_text = "hello"
    # shift = 5
    # cipher_text = "mjqqt"
    # print output: "The encoded text is mjqqt"
    encrypt_word = ""
    for let in range(len(text)):
        for letter in range(len(alphabet)):
            if text[let] == alphabet[letter]:
                letter += shift
                encrypt_word += alphabet[letter]
    print(f"The encoded text is : {encrypt_word}")

# TODO-3: 
# Call the encrypt function and pass in the user inputs. You should
# be able to test the code and encrypt a message
encrypt(text="hello", shift=5)