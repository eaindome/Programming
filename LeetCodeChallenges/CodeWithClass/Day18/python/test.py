from builtins import print, enumerate, range, abs,min


# s = "loveleetcode"
# c = "e"

s = "aaab"
c = "b"
indexes = []

for i, char in enumerate(s):
    if char == c:
        indexes.append(i)

# print(f"indexes: {indexes}")
s = [j for j in s]
print(s)

for k, char in enumerate(s):
    if char == c:
        s[k] = 0
        continue
    else:
        result = []
        for index in indexes:
            result.append(abs(index - k))
            s[k] = min(result)


print(f"s: {s}")