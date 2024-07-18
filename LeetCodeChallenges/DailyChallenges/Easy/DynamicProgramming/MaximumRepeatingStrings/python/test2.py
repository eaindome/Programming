sequence = "aaabaaaabaaabaaaabaaaabaaaabaaaaba"
word = "aaaba"
seen = []

for i in range(len(sequence)):
    if sequence[i:i+len(word)] == word:
        seen.append(i)

print(f"seen: {seen}")
# count = 0
# for i in range(len(sequence)):
#     if sequence[i:i+len(word)] == word:
#         count += 1
