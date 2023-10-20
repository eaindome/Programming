from itertools import product

def get_neighbors(x, y, z):
    neighbors = []
    for dx, dy, dz in product([-1, 0, 1], repeat=3):
        if dx == dy == dz == 0:
            continue
        neighbors.append((x + dx, y + dy, z + dz))
    return neighbors

def simulate_cycles(initial_state, cycles):
    current_grid = initial_state.copy()

    for _ in range(cycles):
        new_grid = set()

        # Consider all active cubes and their neighbors
        candidates = set(current_grid)
        for cube in current_grid:
            candidates.update(get_neighbors(*cube))

        # Update the new grid based on the rules
        for cube in candidates:
            active_neighbors = sum(1 for neighbor in get_neighbors(*cube) if neighbor in current_grid)
            if cube in current_grid:
                if active_neighbors in (2, 3):
                    new_grid.add(cube)
            else:
                if active_neighbors == 3:
                    new_grid.add(cube)

        current_grid = new_grid

    return current_grid

# Initialize the initial state with active cubes
initial_state = set((x, y, 0) for x, row in enumerate([
    ['#', '.', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
]) for y, cell in enumerate(row) if cell == '#')

cycles = 6

# Call the simulate_cycles function to get the grid after six cycles
grid = simulate_cycles(initial_state=initial_state, cycles=cycles)

# The length of the current grid is the count of active cubes
active_count = len(grid)

print(f"Number of active cubes after {cycles} cycles: {active_count}")


