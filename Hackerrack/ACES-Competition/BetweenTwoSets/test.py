a = [2, 6]
b = [24, 36]

max_a = max(a)
min_b = min(b)

count = 0
ab_list = [i for i in range(max_a, min_b+1)]
for j in ab_list:
    if all(j%k == 0 for k in a) and all(l%j == 0 for l in b):
        count += 1

print(f"count: {count}")