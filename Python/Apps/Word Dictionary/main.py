from PyDictionary import PyDictionary

dictionary = PyDictionary()

while True:
    word = input("Enter the word: ")
    if word == "":
        break

    print(dictionary.meaning(word))
