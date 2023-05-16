passwd = "xYWM13%!)*$"
pasList = []

length = len(passwd)
print(length)

print(passwd[2])
print(passwd[8])
print(passwd[10])
two = passwd[2]
pasList.append(two)
pasList.append(passwd[10])
print(pasList)

'''
for char in range(length):
    print(char)'''

for char in range(length):
    pasList.append(passwd[char])

import random
rand_password = ""
for passwrd in range(1, len(pasList)-1):
    rand_password += random.choice(pasList)

print(rand_password)