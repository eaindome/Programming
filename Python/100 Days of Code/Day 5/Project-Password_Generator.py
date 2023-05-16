# Password Generator Project
import random

letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
           'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']


print("Welcome to the PyPassword Generator!")
lettersNum = int(input("How many letters would you like in your password?\n"))
symbolsNum = int(input("How many symbols would you like?\n"))
numbersNum = int(input("How many number would you like?\n"))

# choosing the letters
rand_letter = ""
for letter in range(1, lettersNum+1):
    rand_letter += random.choice(letters)

rand_number = ""
for number in range(1, numbersNum+1):
    rand_number += random.choice(numbers)

rand_symbol = ""
for symbol in range(1, symbolsNum+1):
    rand_symbol += random.choice(symbols)

# easy password
easy_password = rand_letter + rand_number + rand_symbol
print("Here is the easy password: " + easy_password)

# difficult password
passList = []
pass_length = len(easy_password)
for char in range(pass_length):
    passList.append(easy_password[char])

difficult_password = ""
for let in range(1, len(passList)+1):
    difficult_password += random.choice(passList)
print(f"Here is a difficult password to crack: {difficult_password}")

# hard password
random.shuffle(passList)

hard_password = ""
for char in passList:
    hard_password += char
print(f"Here is the hardest password to crack: {hard_password}")