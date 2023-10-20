# trial in getting neighbours for a coordinate points
def get_neighbors(x,y,z):
    neighbors = []

    # loop through all possible combinations of coordinate different
    for dx in [-1,0,1]:
        for dy in [-1,0,1]:
            for dz in [-1,0,1]:
                # skip the case where all differences are 0
                if dx == dy == dz == 0:
                    continue

                # calculate the coordinates of the neighbor cube
                neighbor_x = x + dx
                neighbor_y = y + dy
                neighbor_z = z + dz

                # append the neighbor's coordinates to the list
                neighbors.append((neighbor_x, neighbor_y, neighbor_z))

    return neighbors

"""x=1
y=2
z=3

neighbour = get_neighbors(x, y, z)
print(f"Neighbours: {neighbour}")"""



