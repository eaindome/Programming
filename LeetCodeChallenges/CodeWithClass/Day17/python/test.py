from builtins import print, range, len


# matrix = [
#     [1, 1, 1],
#     [1, 0, 1],
#     [1, 1, 1]
# ]

# matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
matrix = [[0,0,0,5],
          [4,3,1,4],
          [0,1,1,4],
          [1,2,1,3],
          [0,0,1,1]]
position = []
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if matrix[i][j] == 0:
            position.append([i, j])

print(f"position: {position}")

for i in range(len(position)):
    for m in range(len(matrix)):
        matrix[m][position[i][1]] = 0           # sets all elements in the corresponding column to zero
    for n in range(len(matrix[position[i][0]])):
        matrix[position[i][0]][n] = 0           # sets all elements in the corresponding row to zero

print(f"matrix: {matrix}")



            