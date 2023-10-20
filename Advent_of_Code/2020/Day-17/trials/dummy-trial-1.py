from trial1 import get_neighbors

# Define the initial state
initial_state = [
    [
        ['.', '#', '.'],
        ['.', '.', '#'],
        ['#', '#', '#']
    ]
]

# Number of cycles to simulate
cycles = 6

# Function to simulate the cycles
def simulate_cycles(initial_state, cycles):
    current_grid = [[row.copy() for row in initial_state]]

    for _ in range(cycles):
        new_grid = [[['.' for _ in range(len(initial_state[0][0]))] for _ in range(len(initial_state[0]))] for _ in range(len(initial_state))]

        for x in range(len(current_grid)):
            for y in range(len(current_grid[0])):
                for z in range(len(current_grid[0][0])):
                    cube = current_grid[x][y][z]
                    neighbors = get_neighbors(x, y, z)

                    active_neighbors = sum(1 for nx, ny, nz in neighbors if 0 <= nx < len(current_grid) and 0 <= ny < len(current_grid[0]) and 0 <= nz < len(current_grid[0][0]) and current_grid[nx][ny][nz] == '#')

                    if cube == '#' and active_neighbors not in (2, 3):
                        new_grid[x][y][z] = '.'
                    elif cube == '.' and active_neighbors == 3:
                        new_grid[x][y][z] = '#'

        current_grid = new_grid

    return current_grid

# Call the simulate_cycles function to get the grid after six cycles
grid = simulate_cycles(initial_state=initial_state, cycles=cycles)

# Function to count the active cubes in the grid
def count_active_cubes(grid):
    count = 0
    for x in range(len(grid)):
        for y in range(len(grid[0])):
            for z in range(len(grid[0][0])):
                if grid[x][y][z] == '#':
                    count += 1
    return count

# Call the count_active_cubes function to find the number of active cubes after the sixth cycle
active_count = count_active_cubes(grid)

print(f"Number of active cubes after {cycles} cycles: {active_count}")
