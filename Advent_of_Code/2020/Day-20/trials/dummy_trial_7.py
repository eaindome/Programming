import re

# Function to rotate a tile 90 degrees clockwise
def rotate(tile):
    return [''.join(tile[i][j] for i in range(len(tile) - 1, -1, -1)) for j in range(len(tile))]

# Function to flip a tile horizontally
def flip(tile):
    return [row[::-1] for row in tile]

# Function to find the orientation that matches the right border with a given border value
def orient_tile(tile, border):
    for _ in range(4):
        if tile[0] == border:
            return tile
        tile = rotate(tile)
    tile = flip(tile)
    for _ in range(4):
        if tile[0] == border:
            return tile
        tile = rotate(tile)

# Function to assemble the tiles into a grid
def assemble_tiles(tiles):
    size = int(len(tiles) ** 0.5)
    grid = [[None for _ in range(size)] for _ in range(size)]

    # Start with a corner tile
    for tile_id, tile in tiles.items():
        neighbors = 0
        for border in tile:
            for other_id, other_tile in tiles.items():
                if tile_id != other_id:
                    if border in other_tile or border[::-1] in other_tile:
                        neighbors += 1
        if neighbors == 2:
            grid[0][0] = (tile_id, tile)
            break

    # Fill in the rest of the grid
    for row in range(size):
        for col in range(size):
            if row == 0 and col == 0:
                continue
            if col > 0:
                prev_tile_id, prev_tile = grid[row][col - 1]
                border = ''.join(prev_tile[i][-1] for i in range(len(prev_tile)))
                matching_tile_id = next(other_id for other_id, other_tile in tiles.items() if other_id != prev_tile_id and border in other_tile)
                matching_tile = orient_tile(tiles[matching_tile_id], border)
                grid[row][col] = (matching_tile_id, matching_tile)
            else:
                prev_tile_id, prev_tile = grid[row - 1][col]
                border = ''.join(prev_tile[-1][i] for i in range(len(prev_tile[0])))
                matching_tile_id = next(other_id for other_id, other_tile in tiles.items() if other_id != prev_tile_id and border in other_tile)
                matching_tile = orient_tile(tiles[matching_tile_id], border)
                grid[row][col] = (matching_tile_id, matching_tile)

    return grid

# Function to remove tile borders
def remove_borders(tile):
    return [row[1:-1] for row in tile[1:-1]]

# Function to search for sea monsters in the grid
def count_sea_monsters(grid):
    sea_monster_pattern = [
        "                  # ",
        "#    ##    ##    ###",
        " #  #  #  #  #  #   "
    ]
    sea_monster_height = len(sea_monster_pattern)
    sea_monster_width = len(sea_monster_pattern[0])
    num_monsters = 0

    for _ in range(4):
        for _ in range(2):
            for row in range(len(grid) - sea_monster_height):
                for col in range(len(grid[0]) - sea_monster_width):
                    is_sea_monster = True
                    for i in range(sea_monster_height):
                        for j in range(sea_monster_width):
                            if sea_monster_pattern[i][j] == '#' and grid[row + i][col + j] != '#':
                                is_sea_monster = False
                                break
                        if not is_sea_monster:
                            break
                    if is_sea_monster:
                        num_monsters += 1

            grid = rotate(grid)
        grid = flip(grid)

    return num_monsters

# Function to count the number of '#' that are not part of a sea monster
def count_roughness(grid, num_sea_monsters):
    total_hashes = sum(row.count('#') for row in grid)
    sea_monster_hashes = num_sea_monsters * sum(row.count('#') for row in sea_monster_pattern)
    return total_hashes - sea_monster_hashes

if __name__ == "__main__":
    with open("input.txt", "r") as file:
        input_data = file.read()

    tiles = {}
    tile_data = input_data.strip().split('\n\n')
    for tile_info in tile_data:
        tile_lines = tile_info.split('\n')
        tile_id = int(re.match(r"Tile (\d+):", tile_lines[0]).group(1))
        tile_content = [list(line) for line in tile_lines[1:]]
        tiles[tile_id] = tile_content

    grid = assemble_tiles(tiles)
    image = [[None] * len(grid[0][0][1][0]) for _ in range(len(grid) * len(grid[0][0][1]))]

    for row in range(len(grid)):
        for col in range(len(grid[0])):
            tile_id, tile = grid[row][col]
            tile = remove_borders(tile)
            for i in range(len(tile)):
                for j in range(len(tile[0])):
                    image[row * len(tile) + i][col * len(tile[0]) + j] = tile[i][j]

    num_sea_monsters = count_sea_monsters(image)
    roughness = count_roughness(image, num_sea_monsters)

    print("Part One: Product of Corner Tile IDs =", grid[0][0][0])
    print("Part Two: Water Roughness =", roughness)


