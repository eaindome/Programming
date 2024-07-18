from builtins import set, print, len, range


matrix = [
    [0,0,0,5],
    [4,3,1,4],
    [0,1,1,4],
    [1,2,1,3],
    [0,0,1,1]
]

zero_rows = set()
zero_cols = set()

for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if matrix[i][j] == 0:
            zero_rows.add(i)
            zero_cols.add(j)

print(f"zero_rows: {zero_rows}\n"
      f"zero_cols: {zero_cols}")



for i in zero_rows:
    for j in range(len(matrix[i])):
        matrix[i][j] = 0

for k in zero_cols:
    for l in range(len(matrix)):
        matrix[l][k] = 0