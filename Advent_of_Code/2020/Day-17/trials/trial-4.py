def count_active_cubes(initial_state, cycles):
    # create a set to active cubes (x,y,z)
    active_cubes = set()

    # parse the initial_state to populate the active_cubes set
    for y, row in enumerate(initial_state):
        for x, cell in enumerate(row):
            if cell == '#':
                active_cubes.add((x, y, 0))

    # define the neighbors' relative coordinates
    neighbors = [(dx, dy, dz) for dx in range(-1, 2) for dy in range(-1, 2) for dz in range(-1, 2) if (dx, dy, dz) != (0, 0, 0)]

    # simulate the cycles
    for _ in range(cycles):
        new_active_cubes = set()
        inactive_to_check = set()

        # check inactive cubes neighboring active cubes
        for cube in active_cubes:
            x, y, z = cube
            active_neighbors = 0

            for dx, dy, dz in neighbors:
                neighbor = (x + dx, y + dy, z + dz)

                if neighbor in active_cubes:
                    active_neighbors += 1
                else:
                    inactive_to_check.add(neighbor)
            
            if active_neighbors in [2, 3]:
                new_active_cubes.add(cube)
        
        # check inactive cubes to become active
        for cube in inactive_to_check:
            x, y, z = cube
            active_neighbors = 0

            for dx, dy, dz in neighbors:
                neighbor = (x + dx, y + dy, z + dz)

                if neighbor in active_cubes:
                    active_neighbors += 1
            if active_neighbors == 3:
                new_active_cubes.add(cube)
        
        active_cubes = new_active_cubes
    return len(active_cubes)


with open("./input.txt", "r") as file:
    initial_state = [line.strip() for line in file]

# number of cycles
cycles = 6

# calculate the number of active cubes after the specified 
# number of cycles
result = count_active_cubes(initial_state, cycles)
print(f"Initial state: {initial_state}")
print(f"Number of active cubes after {cycles} cycles: {result}")

