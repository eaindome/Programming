rowIndex = 1
res = []

for i in range(rowIndex+1):
    row = [1]
    for j in range(1, i):
        row.append(res[i-1][j-1] + res[i-1][j])
    if i > 0:
        row.append(1)
    res.append(row)

print(f"Rows: {res}\n"
    f"Row {rowIndex}: {res[rowIndex]}")