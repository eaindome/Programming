c = [0, 1, 0, 0, 0, 1, 0]
c = [0, 0, 1, 0, 0, 1, 0]
index = []
minimum_path = []
jump = 0
for i, num in enumerate(c):
    if num == 0:
        index.append(i)

print(f"indices: {index}")

for i in range(len(index)-1):
    if (index[i+1] - index[i]) >= 2:
        minimum_path.append(index[i])
        minimum_path.append(index[i+1])

print(f"minimum_path: {minimum_path}")
print(f"minimum_path: {len(minimum_path) - 1}")