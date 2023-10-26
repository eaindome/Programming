import re

# Function to rotate a tile 90 degrees clockwise
def rotate_tile(tile):
    return [''.join(row) for row in zip(*reversed(tile))]

# Function to flip a tile horizontally
def flip_tile_horizontally(tile):
    return [''.join(reversed(row)) for row in tile]

# Function to flip a tile vertically
def flip_tile_vertically(tile):
    return list(reversed(tile))

# Function to find the border of a tile (top, right, bottom, left)
def get_borders(tile):
    top = tile[0]
    right = ''.join(row[-1] for row in tile)
    bottom = tile[-1]
    left = ''.join(row[0] for row in tile)
    return top, right, bottom, left

# Function to match two tiles based on a specified border
def match_tiles(tile1, tile2, border):
    for _ in range(4):
        if get_borders(tile1)[0] == border:
            return tile1
        tile1 = rotate_tile(tile1)
    tile1 = flip_tile_horizontally(tile1)
    for _ in range(4):
        if get_borders(tile1)[0] == border:
            return tile1
        tile1 = rotate_tile(tile1)
    return None

# Read the input tiles
with open('input.txt', 'r') as f:
    data = f.read().strip().split('\n\n')

tiles = {}
for tile_data in data:
    tile_lines = tile_data.split('\n')
    tile_id = int(re.search(r'\d+', tile_lines[0]).group())
    tile = tile_lines[1:]
    tiles[tile_id] = tile

# Find the size of the puzzle
puzzle_size = int(len(tiles) ** 0.5)

# Initialize the puzzle grid
grid = [[None for _ in range(puzzle_size)] for _ in range(puzzle_size)]

# Find the corners by looking for tiles with only two matching borders
corner_tiles = []
for tile_id, tile in tiles.items():
    matching_borders = 0
    borders = get_borders(tile)
    for other_tile_id, other_tile in tiles.items():
        if tile_id != other_tile_id:
            for border in borders:
                if border in get_borders(other_tile):
                    matching_borders += 1
                    break
    if matching_borders == 2:
        corner_tiles.append(tile_id)

# Start by placing one of the corner tiles in the top-left corner
grid[0][0] = corner_tiles[0]

# Place the rest of the corner tiles and determine their orientation
for i in range(1, 4):
    current_tile = tiles[grid[0][i - 1]]
    next_tile_id = [tile_id for tile_id in tiles if tile_id != grid[0][i - 1] and len(set(get_borders(current_tile)).intersection(get_borders(tiles[tile_id]))) == 1][0]
    next_tile = tiles[next_tile_id]
    while get_borders(current_tile)[1] != get_borders(next_tile)[3]:
        next_tile = rotate_tile(next_tile)
    tiles[next_tile_id] = next_tile
    grid[0][i] = next_tile_id

# Fill in the top row
for i in range(4, puzzle_size):
    current_tile = tiles[grid[0][i - 1]]
    for tile_id, tile in tiles.items():
        if tile_id != grid[0][i - 1] and len(set(get_borders(current_tile)).intersection(get_borders(tile))) == 1:
            next_tile_id = tile_id
            next_tile = tile
            break
    while get_borders(current_tile)[1] != get_borders(next_tile)[3]:
        next_tile = rotate_tile(next_tile)
    tiles[next_tile_id] = next_tile
    grid[0][i] = next_tile_id

# Fill in the remaining rows
for i in range(1, puzzle_size):
    for j in range(puzzle_size):
        current_tile = tiles[grid[i - 1][j]]
        for tile_id, tile in tiles.items():
            if tile_id != grid[i - 1][j] and len(set(get_borders(current_tile)).intersection(get_borders(tile))) == 1:
                next_tile_id = tile_id
                next_tile = tile
                break
        while get_borders(current_tile)[2] != get_borders(next_tile)[0]:
            next_tile = rotate_tile(next_tile)
        tiles[next_tile_id] = next_tile
        grid[i][j] = next_tile_id

# Assemble the final image by removing borders
image = [['' for _ in range(puzzle_size)] for _ in range(puzzle_size)]

for i in range(puzzle_size):
    for j in range(puzzle_size):
        tile = tiles[grid[i][j]]
        tile = [row[1:-1] for row in tile[1:-1]]
        image[i][j] = tile

# Merge the image into a single grid
final_image = []
for row in image:
    for i in range(len(row[0])):
        final_image.append(''.join(row[j][i] for j in range(puzzle_size)))

# Define the monster pattern
monster = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
]

# Count the number of monsters in the image
monster_count = 0
for _ in range(4):
    final_image = rotate_tile(final_image)
    monster_count += sum(
        all(final_image[i + x][j + y] == "#" for y, value in enumerate(row) for x, char in enumerate(value) if char == "#")
        for i, row in enumerate(monster)
        for j, _ in enumerate(row)
    )
final_image = flip_tile_horizontally(final_image)
for _ in range(4):
    final_image = rotate_tile(final_image)
    monster_count += sum(
        all(final_image[i + x][j + y] == "#" for y, value in enumerate(row) for x, char in enumerate(value) if char == "#")
        for i, row in enumerate(monster)
        for j, _ in enumerate(row)
    )

# Calculate the roughness of the sea
total_roughness = sum(row.count("#") for row in final_image)
roughness_without_monsters = total_roughness - monster_count * sum(row.count("#") for row in monster)

print("The product of the IDs of the four corner tiles is:", corner_tiles[0] * corner_tiles[1] * corner_tiles[2] * corner_tiles[3])
print("The roughness of the sea is:", roughness_without_monsters)

# Print the IDs of the four corner tiles
print("The IDs of the four corner tiles are:", corner_tiles)

