from builtins import all, print


keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"]

key_words = []
words = ["Hello","Alaska","Dad","Peace"]

for word in words:
    lower_word = word.lower()
    for value in key_words:
        if all(char in value for char in lower_word):
            key_words.append(word)
            break

print(f"key words: {key_words}")


