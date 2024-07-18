sequence = "aaabaaaabaaabaaaabaaaabaaaabaaaaba"
word = "aaaba"

k = 0
while word * k in sequence:
    print(f"word * k [{k}]: {word * k}")
    k += 1


print(f"Maximum k-repeating strings: {k-1}")