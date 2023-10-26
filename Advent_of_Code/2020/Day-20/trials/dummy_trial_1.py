import re
from collections import defaultdict

# Read the input data and parse it into tile IDs and images
with open("input.txt", "r") as file:
    data = file.read().strip().split('\n\n')

tiles = {}
for tile_info in data:
    lines = tile_info.strip().split('\n')
    tile_id = int(re.search(r'\d+', lines[0]).group())
    tile_image = [list(line) for line in lines[1:]]
    tiles[tile_id] = tile_image

# Function to rotate a tile 90 degrees clockwise
def rotate(tile):
    return list(map(list, zip(*reversed(tile))))

# Function to flip a tile horizontally
def flip(tile):
    return [row[::-1] for row in tile]

# Find matching borders between two tiles
def find_matching_borders(tile1, tile2):
    borders1 = [tile1[0], tile1[-1], ''.join(row[0] for row in tile1), ''.join(row[-1] for row in tile1)]
    borders2 = [tile2[0], tile2[-1], ''.join(row[0] for row in tile2), ''.join(row[-1] for row in tile2)]
    for i, border1 in enumerate(borders1):
        for j, border2 in enumerate(borders2):
            if border1 == border2 or border1 == border2[::-1]:
                return i, j
    return None

# Create a dictionary to store the number of matching borders for each tile
matching_counts = defaultdict(int)

# Find the corner tiles and calculate the product of their IDs
corner_tile_ids = []
for tile_id, tile_image in tiles.items():
    for other_id, other_image in tiles.items():
        if tile_id != other_id:
            match = find_matching_borders(tile_image, other_image)
            if match is not None:
                matching_counts[tile_id] += 1

# Find the corner tiles by identifying those with exactly 2 matching borders
for tile_id, count in matching_counts.items():
    if count == 2:
        corner_tile_ids.append(tile_id)

# Assemble the image by connecting tiles
image_size = int(len(tiles) ** 0.5)
image = [[None] * image_size for _ in range(image_size)]
corner_tile_id = corner_tile_ids[0]

# Initialize the image with None values
image = [[None] * image_size for _ in range(image_size)]

# Find the orientation of the first corner tile (rotate/flip as needed)
corner_tile = tiles[corner_tile_id]
while matching_counts[corner_tile_id] != 2:
    corner_tile = rotate(corner_tile)
    matching_counts[corner_tile_id] = 2

# Place the first corner tile in the top-left corner of the image
image[0][0] = corner_tile

# Fill in the first row of the image
for j in range(1, image_size):
    for other_id, other_image in tiles.items():
        if other_id != corner_tile_id:
            match = find_matching_borders(corner_tile, other_image)
            if match is not None:
                border_index, _ = match
                while border_index != 2:
                    other_image = rotate(other_image)
                    border_index = (border_index + 1) % 4
                if border_index == 2:
                    other_image = flip(other_image)
                image[0][j] = other_image
                corner_tile = other_image
                break

# Fill in the rest of the image
for i in range(1, image_size):
    for j in range(image_size):
        for other_id, other_image in tiles.items():
            if other_image not in image[i] and all(image[i - 1][col] is not None for col in range(j + 1)):
                match = find_matching_borders(image[i - 1][j], other_image)
                if match is not None:
                    _, border_index = match
                    while border_index != 0:
                        other_image = rotate(other_image)
                        border_index = (border_index + 1) % 4
                    if border_index == 2:
                        other_image = flip(other_image)
                    image[i][j] = other_image
                    break

"""# Print the IDs of the corner tiles after assembling the image
corner_tile_ids_after_assembly = [image[0][0], image[0][-1], image[-1][0], image[-1][-1]]
print("Corner Tile IDs After Assembly:", corner_tile_ids_after_assembly)"""

# Calculate the product of the IDs of the four corner tiles
corner_tile_product = 1
for tile_id in corner_tile_ids:
    corner_tile_product *= tile_id

print("Product of corner tile IDs:", corner_tile_product)

# Print the IDs of the four corner tiles
print("Corner Tile IDs:")
for tile_id in corner_tile_ids:
    print(tile_id)


"""# Print the four corner tiles
print("Corner Tiles:")
for i in range(2):
    for j in range(2):
        print(f"Tile {image[i * (image_size - 1)][j * (image_size - 1)]}:")
        for row in image[i * (image_size - 1)][j * (image_size - 1)]:
            print("".join(row))
        print()"""