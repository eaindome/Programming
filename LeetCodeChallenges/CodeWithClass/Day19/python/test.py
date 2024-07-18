from builtins import print, enumerate, all


keyboard = {
    1: "qwertyuiop",
    2: "asdfghjkl",
    3: "zxcvbnm"
}

key_words = []
words = ["Hello","Alaska","Dad","Peace"]

for i, word in enumerate(words):
    word = word.lower()
    for value in keyboard.values():
        if all(char in value for char in word):
            key_words.append(words[i])
            break

print(f'key words: {key_words}')




