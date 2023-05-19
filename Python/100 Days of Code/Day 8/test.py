# Caesar Cipher 1

# Don't change the code below
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

text = input("Type your message: \n")
shift = int(input("Type the shift number: \n"))
# Don't change the code above

#for letter in range(len(letters)):
#    print(letter)
print()
encrypt = ""
for let in range(len(text)):
    for letter in range(len(letters)):
        if text[let] == letters[letter]:
            letter += shift
            encrypt += letters[letter]
print(encrypt)
    #print(letter)
    #print(text[letter])
