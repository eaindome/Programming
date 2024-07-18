from builtins import len, float, abs, print, min, range


s = "aaab"
c = "b"

# convert string to list
s = [j for j in s]

# initialize result list
res = [len(s)] * len(s)

# first pass
# find the distance to the previous occurrence of 'c'
prev = float('-inf')
print(f"prev: {prev}\n"
      f"type: {type(prev)}")

print(f"res: {res}\n")

for i in range(len(s)):
    if s[i] == c:
        prev = i
    res[i] = min(res[i], abs(i - prev))

print(f'res: {res}')

# second pass
prev = float('inf')
for i in range(len(s) - 1, -1, -1):
    if s[i] == c:
        prev = i
    res[i] = min(res[i], abs(i - prev))

print(f"res: {res}")