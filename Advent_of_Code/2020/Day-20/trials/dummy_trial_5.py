import math

# Define a Tile class to store tile ID and image data
class Tile:
    def __init__(self, tile_id, tile_data):
        self.tile_id = tile_id
        self.tile_data = tile_data

    def rotate_clockwise(self):
        self.tile_data = [''.join(row) for row in zip(*self.tile_data[::-1])]

    def flip_horizontal(self):
        self.tile_data = [row[::-1] for row in self.tile_data]

    def flip_vertical(self):
        self.tile_data = self.tile_data[::-1]

    def get_border(self, side):
        if side == "top":
            return self.tile_data[0]
        elif side == "right":
            return ''.join(row[-1] for row in self.tile_data)
        elif side == "bottom":
            return self.tile_data[-1]
        elif side == "left":
            return ''.join(row[0] for row in self.tile_data)

    def match_borders(self, other_tile):
        for side in ["top", "right", "bottom", "left"]:
            for flip in [False, True]:
                for _ in range(4):
                    if self.get_border(side) == other_tile.get_border("bottom"):
                        return True
                    other_tile.rotate_clockwise()
                other_tile.flip_horizontal()
            other_tile.flip_vertical()

    def remove_border(self):
        self.tile_data = self.tile_data[1:-1]
        self.tile_data = [row[1:-1] for row in self.tile_data]

# Read the input tiles and store them in a dictionary
tiles = {}
with open("input.txt", "r") as file:
    tile_data = file.read().strip().split('\n\n')
    for tile_info in tile_data:
        tile_info = tile_info.split('\n')
        tile_id = int(tile_info[0][5:-1])
        tile_rows = tile_info[1:]
        tiles[tile_id] = Tile(tile_id, tile_rows)

# Print the first tile data for testing
#print(tiles[2311].tile_data)

# Find the corner tiles by checking each tile against all others
corner_tile_ids = []
for tile_id, tile in tiles.items():
    matching_count = 0
    for other_tile_id, other_tile in tiles.items():
        if tile_id != other_tile_id and tile.match_borders(other_tile):
            matching_count += 1
    if matching_count == 2:
        corner_tile_ids.append(tile_id)

# Multiply the IDs of the four corner tiles
result = math.prod(corner_tile_ids)
print("Result:", result)

# Adjust the grid dimensions based on the number of tiles
grid_size = int(len(tiles) ** 0.5)

# Extract tile IDs from the input data
tile_ids = list(tiles.keys())

# Remove borders from all tiles
for tile in tiles.values():
    tile.remove_border()

# Create the full image
full_image = []
for row in range(grid_size):
    for col in range(grid_size):
        tile_id = tile_ids[row * grid_size + col]  # Extract the tile ID from the list
        tile = tiles[tile_id]
        for i, line in enumerate(tile.tile_data):
            if col == 0:
                full_image.append(line)
            else:
                full_image[i] += line

# Find the maximum length of a line in the full_image
max_line_length = max(len(line) for line in full_image)

# Pad shorter lines with spaces to make them the same length as the longest line
full_image = [line.ljust(max_line_length) for line in full_image]


# Define sea monster pattern
sea_monster = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   "
]

def count_sea_monsters(image):
    sea_monster_count = 0
    sea_monster_height = len(sea_monster)
    sea_monster_width = len(sea_monster[0])
    image_height = len(image)
    image_width = len(image[0])

    for r in range(image_height - sea_monster_height + 1):
        for c in range(image_width - sea_monster_width + 1):
            is_sea_monster = True
            for i in range(sea_monster_height):
                for j in range(sea_monster_width):
                    try:
                        if sea_monster[i][j] == "#" and image[r + i][c + j] != "#":
                            is_sea_monster = False
                            break
                    except IndexError:
                        print("Error: r =", r, "c =", c, "i =", i, "j =", j)
                        print("image[r+i]:", image[r + i])
                        print("image[r+i][c+j]:", image[r + i][c + j])
                        print("sea_monster[i][j]:", sea_monster[i][j])
                if not is_sea_monster:
                    break
            if is_sea_monster:
                sea_monster_count += 1
    return sea_monster_count

"""print(f"Full image: {full_image}\n"
      f"\nLength of image: {len(full_image)}")

print(f"image: {full_image[8][7]}")
print(f"sea monster: {sea_monster[1][5]}")"""

# Try all possible orientations (rotations and flips) of the image
for _ in range(4):
    sea_monster_count = count_sea_monsters(full_image)
    if sea_monster_count > 0:
        break
    full_image = [''.join(row) for row in zip(*full_image[::-1])]  # Rotate 90 degrees
else:
    full_image = full_image[::-1]  # Flip horizontally
    for _ in range(4):
        sea_monster_count = count_sea_monsters(full_image)
        if sea_monster_count > 0:
            break
        full_image = [''.join(row) for row in zip(*full_image[::-1])]  # Rotate 90 degrees

# Calculate the water roughness
roughness = sum(row.count("#") for row in full_image) - sea_monster_count * sum(row.count("#") for row in sea_monster)
print("Water Roughness:", roughness)

# Calculate the water roughness
roughness = sum(row.count("#") for row in full_image) - sea_monster_count * sum(row.count("#") for row in sea_monster)

# Print the coordinates of # characters in the full_image
"""for i in range(len(full_image)):
    for j in range(len(full_image[i])):
        if full_image[i][j] == "#":
            print(f"# at ({i}, {j})")

print("Water Roughness:", roughness)"""




full = [
    '#.####.#.#.#..#.###..#.....#..##..#######..#.##.#####..#', 
    '##...#..###....#.##.#####...###..##.###.#.####........#.', 
    '..#.##..##.##.###...####.##....####.###.###.#.#....#####', 
    '....#.#####.######....##.#..##.#..#.#.#.#.####..#..#.###', 
    '..##.##.##.#.....###.###...#....#.########..##.###.#...#', 
    '#...#......########.#####..#######..#.##...#..#.#.#####.', 
    '.#.##.......#..##.#..#.#####...#..###.#..#.#......###.#.', 
    '#.###.#..####.....##.#...#.#..#.....##.####.#.........#.', 
    '.####...', 
    '#.##.#.#', 
    '###..###', 
    '###.....', 
    '.#.#####', 
    '.###..#.', 
    '#....#..', 
    '.#....##', 
    '...###..', 
    '.#.###..', 
    '#.##..#.', 
    '#####..#', 
    '#..####.', 
    '..#.#..#', 
    '.####.##', 
    '.#.#.###'
]


