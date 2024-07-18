rowIndex = 1
row = [1]
print(f"Row (0, 0): {row.insert(0,0)}")

for i in range(1, rowIndex+1):
    row.insert(0, 0)
    for j in range(i):
        row[j] = row[j] + row[j+1]

print(f"Row: {row}")