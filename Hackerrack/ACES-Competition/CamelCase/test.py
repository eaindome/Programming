from builtins import print


s = "saveChangesInTheEditor"
count_word = 1

for i in s:
    if i.isupper():
        count_word += 1

print(f"Number of words: {count_word}")