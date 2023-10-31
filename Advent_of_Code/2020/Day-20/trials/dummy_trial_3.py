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
        return False

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
