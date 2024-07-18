n = 5
res = []

for i in range(n):
    if i == 0:
        res.append([1])
    elif i == 1:
        res.append([1, 1])
    else:
        row = [1]
        for j in range(1, i):
            row.append(res[i-1][j-1] + res[i-1][j])
        row.append(1)
        res.append(row)

m = 0
for row in res:
    print(f"Row {m}: {row}")
    m += 1

    












# for i in range(3, 10):
#     res.append([1] + [res[-1][j] + res[-1][j+1] for j in range(i-2)] + [1])