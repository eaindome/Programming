def count_active_hypercubes(initial_state, cycles):
    # Create a set to store the active hypercubes (x, y, z, w)
    active_hypercubes = set()

    # Parse the initial_state to populate the active_hypercubes set
    for y, row in enumerate(initial_state):
        for x, cell in enumerate(row):
            if cell == '#':
                active_hypercubes.add((x, y, 0, 0))

    # Define the neighbors' relative coordinates in 4D
    neighbors = [(dx, dy, dz, dw) for dx in range(-1, 2) for dy in range(-1, 2) for dz in range(-1, 2) for dw in range(-1, 2) if (dx, dy, dz, dw) != (0, 0, 0, 0)]

    # Simulate the cycles
    for _ in range(cycles):
        new_active_hypercubes = set()
        inactive_to_check = set()

        # Check inactive hypercubes neighboring active hypercubes
        for hypercube in active_hypercubes:
            x, y, z, w = hypercube
            active_neighbors = 0

            for dx, dy, dz, dw in neighbors:
                neighbor = (x + dx, y + dy, z + dz, w + dw)

                if neighbor in active_hypercubes:
                    active_neighbors += 1
                else:
                    inactive_to_check.add(neighbor)

            if active_neighbors in [2, 3]:
                new_active_hypercubes.add(hypercube)

        # Check inactive hypercubes to become active
        for hypercube in inactive_to_check:
            x, y, z, w = hypercube
            active_neighbors = 0

            for dx, dy, dz, dw in neighbors:
                neighbor = (x + dx, y + dy, z + dz, w + dw)

                if neighbor in active_hypercubes:
                    active_neighbors += 1

            if active_neighbors == 3:
                new_active_hypercubes.add(hypercube)

        active_hypercubes = new_active_hypercubes

    return len(active_hypercubes)

# Initial state as a list of strings
initial_state = [
    ".#.",
    "..#",
    "###",
]

# Number of cycles
cycles = 6

# Calculate the number of active hypercubes after the specified number of cycles
result = count_active_hypercubes(initial_state, cycles)
print("Number of active hypercubes after", cycles, "cycles:", result)
