a = [2, 6]
b = [24, 36]

count = 0
for i in range(max(a), max(b)+1):
    if all(i % j == 0 for j in a) and all(j % i == 0 for j in b):
        count += 1

print(f"count: {count}")