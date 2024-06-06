def check_winner(grid):
    # check rows and columns
    for i in range(3):
        if all(grid[i][j] == 'X' for j in range(3)) or all(grid[j][i] == 'X' for j in range(3)):
            return 'A'
        if all(grid[i][j] == 'O' for j in range(3)) or all(grid[j][i] == 'O' for j in range(3)):
            return 'B'
        
    # check diagonals
    if all(grid[i][i] == 'X' for i in range(3)) or all(grid[i][2-i] == 'X' for i in range(3)):
        return 'A'
    if all(grid[i][i] == 'O' for i in range(3)) or all(grid[i][2-i] == 'O' for i in range(3)):
        return 'B'
    
    # check if there is any empty cell
    if any(grid[i][j] == '' for i in range(3) for j in range(3)):
        return 'Pending'
    
    # if no empty cell, then it's a draw
    return 'Draw'

grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]
moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]

grid[moves[0][0]][moves[0][1]] = 'X'

for i in range(1, len(moves)):
    if i % 2 == 0:
        grid[moves[i][0]][moves[i][1]] = 'X'
    else:
        grid[moves[i][0]][moves[i][1]] = 'O'
    
    result = check_winner(grid)
    if result != 'Pending':
        print(result)
        break