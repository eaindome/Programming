import re
import numpy as np

# Function to get the borders of a tile (top, bottom, left, and right)
def get_borders(tile):
    top = tile[0, :]
    bottom = tile[-1, :]
    left = tile[:, 0]
    right = tile[:, -1]
    return top, bottom, left, right

# Function to find the matching borders of a tile with other tiles
def get_matching_borders(tile, tiles):
    tile_borders = get_borders(tile)
    matching_borders = []

    for tile_id, other_tile in tiles.items():
        if tile_id == id:
            continue
        other_borders = get_borders(other_tile)

        for i, border in enumerate(tile_borders):
            # Check if the border matches with any of the other tile's borders or their flips
            for other_border in other_borders:
                if np.array_equal(border, other_border) or np.array_equal(border, np.flip(other_border)):
                    matching_borders.append(tile_id)

    return matching_borders


# Function to rotate a tile 90 degrees counterclockwise
def rotate_tile(tile):
    return np.rot90(tile, 1)

# Function to flip a tile horizontally
def flip_tile(tile):
    return np.flip(tile, axis=1)

# Function to remove borders from a tile
def remove_borders(tile):
    return tile[1:-1, 1:-1]

# Function to assemble the tiles into an image
def assemble_image(tiles):
    # Determine the image dimensions (assuming a square image)
    image_size = int(np.sqrt(len(tiles)))
    image = np.zeros((image_size, image_size), dtype=int)
    
    # Start with a corner tile and orient it correctly
    for tile_id, tile_data in tiles.items():
        if len(get_matching_borders(tile_data, tiles)) == 2:
            break

    # Assemble the image by matching adjacent tiles
    for y in range(image_size):
        for x in range(image_size):
            matching_borders = get_matching_borders(tile_data, tiles)
            for i, border in enumerate(matching_borders):
                if i == 2 and x < image_size - 1:
                    image[y, x+1] = tile_id
                elif i == 1 and y < image_size - 1:
                    image[y+1, x] = tile_id
                tile_data = rotate_tile(tile_data)
                if i == 3:
                    tile_data = flip_tile(tile_data)

    return image

# Function to find sea monsters in the image
def find_sea_monsters(image, monster_pattern):
    monster_count = 0
    total_hashes = np.sum(image)

    for _ in range(4):
        for _ in range(2):
            for i in range(len(image) - len(monster_pattern) + 1):
                for j in range(len(image[0]) - len(monster_pattern[0]) + 1):
                    subimage = image[i:i+len(monster_pattern), j:j+len(monster_pattern)]
                    if np.all(subimage & monster_pattern == monster_pattern):
                        monster_count += 1
                        # Replace the sea monster pattern with zeros in the image
                        image[i:i+len(monster_pattern), j:j+len(monster_pattern)] -= monster_pattern
            image = rotate_tile(image)
        image = flip_tile(image)

    return monster_count, total_hashes

# Function to count the number of '#' in the image that are not part of a sea monster
def count_rough_waters(image, monster_count, monster_pattern):
    return np.sum(image) - monster_count * np.sum(monster_pattern)

# Main function
def main():
    with open("input.txt", "r") as file:
        data = file.read().strip()

    # Split the input data into individual tiles
    tiles_data = data.split('\n\n')
    tiles = {}

    for tile_data in tiles_data:
        lines = tile_data.strip().split('\n')
        tile_id = int(re.match(r'Tile (\d+):', lines[0]).group(1))
        tile = np.array([[1 if c == '#' else 0 for c in line] for line in lines[1:]])
        tiles[tile_id] = tile

    image = assemble_image(tiles)
    monster_pattern = np.array([
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
    ])
    monster_count, total_hashes = find_sea_monsters(image, monster_pattern)
    rough_waters = total_hashes - monster_count * np.sum(monster_pattern)

    print("Number of '#' that are not part of a sea monster:", rough_waters)

if __name__ == "__main__":
    main()









