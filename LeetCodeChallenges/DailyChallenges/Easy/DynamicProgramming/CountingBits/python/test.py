n = 2
ans = []
for i in range(n+1):
    count_1 = []
    for j in bin(i)[2:]:
        if j == "1":
            count_1.append(j)
    ans.append(len(count_1))

print(f"Output: {ans}")