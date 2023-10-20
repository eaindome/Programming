from trial1 import get_neighbors

# trial for simulating cycles
def simulate_cycles(initial_state, cycles):
    current_grid = initial_state.copy()

    for _ in range(cycles):
        new_grid = current_grid.copy()

        # iterate through all cubes in the current grid
        for x in range(len(current_grid)):
            for y in range(len(current_grid[0])):
                for z in range(len(current_grid[0][0])):
                    cube = current_grid[x][y][z]
                    neighbours = get_neighbors(x, y, z)
                    active_neighbors = sum(current_grid[nx][ny][nz] == '#' for nx, ny, nz in neighbours)

                    if cube == '#' and active_neighbors not in (2, 3):
                        new_grid[x][y][z] = '.'
                    elif cube == '.' and active_neighbors == 3:
                        new_grid[x][y][z] = '#'

        current_grid = new_grid
    return current_grid