## 1. Orientation and Matching Borders
# function to find matching borders
def find_matching_borders(tiles, tile1_id, tile2_id):
    """
    Compare the borders of two tiles to find matching edges.

    Arguments:
    - tiles: A dictionary containing tile data
    - tile1_id: ID of the first tile
    - tile2_id: ID of the second tile

    Returns:
    - None if not matching border is found
    - A tuple(edge1, edge2) if matching borders are found,
      where edge1 is the matching edge of tile1,
      and edge2 is the matching edge of tile2
    """
    tile1 = tiles[tile1_id]
    tile2 = tiles[tile2_id]

    # compare the top edge of tile1 with all edges of tile2
    for i in range(4):
        edge1 = tile1[0]
        edge2 = tile2[0][::-1]      # reverse edge2 for comparison
        if edge1 == edge2:
            return(edge1, edge2)
        
        # rotate tile2 90 degrees clockwise for next comparison
        tile2 = ["".join(row) for row in zip(*tile2[::-1])]
    
    # if no matching border is found, return none
    return None

## 2. Construct a grid image to represent the larger square image
# function to construct a grid image (2D)
def construct_image(tiles):
    """
    Construct a larger image by arranging tiles based on matching
    borders.

    Argument:
    - tiles: A dictionary containing tile data, where keys are tile IDs
            and values are lists of strings
            representing the image data of each tile.

    Returns:
    - A 2D grid (a list of lists) representing the arranged tiles in
    the larger image 
    """
    # adding the reference tile to the center of the grid
    grid = [[None]]
    grid[0][0] = "Tile 2311"    # any tile Id can be the reference tile

    # loop through the grid and place tiles based on matching borders
    for row in range(len(grid)):
        for col in range(len(grid[row])):
            if grid[row][col] is not None:
                for tile_id, tile_data in tiles.items():
                    if tile_id not in [grid[r][c] for r in range(len(grid)) for c in range(len(grid[r]))]:
                        matching_tile_id = None
                        
                        # check adjacent tiles for a matching border
                        if row > 0 and (match := find_matching_borders(tiles, grid[row][col], grid[row-1][col])):
                            matching_tile_id = grid[row-1][col]
                            grid[row].append(matching_tile_id)
                        elif col > 0 and (match := find_matching_borders(tiles, grid[row][col], grid[row][col-1])):
                            matching_tile_id = grid[row][col-1]
                            grid[row].append(matching_tile_id)

                        if matching_tile_id:
                            # place the matching tile in the grid
                            grid[row].append(tile_id)

    # iterate through the grid and place tiles
    for row in range(len(grid)):
        for col in range(len(grid[row])):
            if grid[row][col] is None:
                if not place_tile(grid, tiles, row, col):
                    # backtrack if not tile can be placed at this position
                    return None
                
    ## 4. Iteratively building by trial and error process
    # a helper function and iterative process
    # helper function to check if a position is a valid grid position
    def is_valid_position(r, c):
        return 0 <= r < len(grid) and 0 <= c < len(grid[r])
    
    # start the iterative building process
    for row in range(len(grid)):
        for col in range(len(grid[row])):
            if grid[row][col] is None:
                for tile_id, tile_data in tiles.items():
                    if tile_id not in [grid[r][c] for r in range(len(grid)) for c in range(len(grid[r]))]:
                        for num_rotations in range(4):
                            for is_flipped in [False, True]:
                                rotated_tile_data = tile_data if not is_flipped else flip_tile(tile_data)
                                rotated_tile_data = rotate_tile(rotated_tile_data, num_rotations)

                                if row > 0 and not find_matching_borders(tiles, grid[row][col], grid[row - 1][col]):
                                    continue
                                if col > 0 and not find_matching_borders(tiles, grid[row][col], grid[row][col - 1]):
                                    continue

                                if is_valid_position(row, col):
                                    grid[row][col] = tile_id
                                else:
                                    return None
    return grid

## 3. Tile Placements
# 2 helper functions and a function for placing tiles based on rules
# helper function to rotate tile
def rotate_tile(tile_data, num_rotations):
    """
    Rotate a tile's image data 90 degrees clockwise 'num_rotations' times.

    Args:
    - tile_data: List of strings representing the image data of the tile.
    - num_rotations: Number of 90-degree clockwise rotations to apply.

    Returns:
    - Rotated tile data.
    """

    # rotate the tile data 90 degrees clockwise 'num_rotations' times
    for _ in range(num_rotations):
        tile_data = ["".join(row) for row in zip(*tile_data[::-1])]
    return tile_data

# helper function to flip tile
def flip_tile(tile_data):
    """
    Flip a tile's image data horizontally.

    Args:
    - tile_data: List of strings representing the image data of the tile.

    Returns:
    - Horizontally flipped tile data.
    """

    # flip the tile horizontally
    return [row[::-1] for row in tile_data]

# function to place tile
def place_tile(grid, tiles, row, col):
    """
    Attempt to place a tile in the grid at the specified position while ensuring matching borders.

    Args:
    - grid: A 2D grid (a list of lists) representing the arranged tiles in the larger image.
    - tiles: A dictionary containing tile data.
    - row: Row index for the position where the tile should be placed.
    - col: Column index for the position where the tile should be placed.

    Returns:
    - True if a tile is successfully placed at the position.
    - False if no valid placement is found.
    """

    for tile_id, tile_data in tiles.items():
        if tile_id not in [grid[r][c] for r in range(len(grid)) for c in range(len(grid[r]))]:
            for num_rotations in range(4):
                for is_flipped in [False, True]:
                    rotated_tile_data = tile_data if not is_flipped else flip_tile(tile_data)
                    rotated_tile_data = rotate_tile(rotated_tile_data, num_rotations)

                    # check if the rotated tile matches adjacent tiles
                    if row > 0 and not find_matching_borders(tiles, grid[row][col], grid[row-1][col]):
                        continue
                    if col > 0 and not find_matching_borders(tiles, grid[row][col], grid[row][col-1]):
                        continue

                    # place the tile in the grid and move to the next position
                    grid[row][col] = tile_id
                    return True
    return False

## 5. Identifying coner tiles
# function to identify  tiles
def identify_corner_tiles(grid):
    """
    Identify the four corner tiles in the large square image.

    Args:
    - grid: A 2D grid (a list of lists) representing the arranged tiles in the larger image.

    Returns:
    - A list of four corner tile IDs.
    """
    
    corner_tiles = []

    # top-left corner tile
    corner_tiles.append(grid[0][0])

    # top-right corner tile
    corner_tiles.append(grid[0][-1])

    # bottom-left corner tile
    corner_tiles.append(grid[-1][0])

    # bottom-right corner tile
    corner_tiles.append(grid[-1][-1])

    return corner_tiles

## 6. calculating the final answer
# function to multiply the IDs of the four corners
def calculate_answer(corner_tiles):
    answer = 1
    for tile_id in corner_tiles:
        tile_number = int(tile_id.split()[1])
        answer *= tile_number
    return answer

tiles = {
    "Tile 2311": [
        "..##.#..#.",
        "##..#.....",
        "#...##..#.",
        "####.#...#",
        "##.##.###.",
        "##...#.###",
        ".#.#.#..##",
        "..#....#..",
        "###...#.#.",
        "..###..###"
    ],

    "Tile 1951": [
        "#.##...##.",
        "#.####...#",
        ".....#..##",
        "#...######",
        ".##.#....#",
        ".###.#####",
        "###.##.##.",
        ".###....#.",
        "..#.#..#.#",
        "#...##.#.."
    ],

    "Tile 1171": [
        "####...##.",
        "#..##.#..#",
        "##.#..#.#.",
        ".###.####.",
        "..###.####",
        ".##....##.",
        ".#...####.",
        "#.##.####.",
        "####..#...",
        ".....##..."
    ],

    "Tile 1427": [
        "###.##.#..",
        ".#..#.##..",
        ".#.##.#..#",
        "#.#.#.##.#",
        "....#...##",
        "...##..##.",
        "...#.#####",
        ".#.####.#.",
        "..#..###.#",
        "..##.#..#."
    ],
    
    "Tile 1489": [
        "##.#.#....",
        "..##...#..",
        ".##..##...",
        "..#...#...",
        "#####...#.",
        "#..#.#.#.#",
        "...#.#.#..",
        "##.#...##.",
        "..##.##.##",
        "###.##.#.."
    ],

    "Tile 2473": [
       " #....####.",
        "#..#.##...",
        "#.##..#...",
        "######.#.#",
        ".#...#.#.#",
        ".#########",
        ".###.#..#.",
        "########.#",
        "##...##.#.",
        "..###.#.#."
    ],

    "Tile 2971": [
        "..#.#....#",
        "#...###...",
        "#.#.###...",
        "##.##..#..",
        ".#####..##",
        ".#..####.#",
        "#..#.#..#.",
        "..####.###",
        "..#.#.###.",
        "...#.#.#.#"
    ],

    "Tile 2729": [
        "...#.#.#.#",
        "####.#....",
        "..#.#.....",
        "....#..#.#",
        ".##..##.#.",
        ".#.####...",
        "####.#.#..",
        "##.####...",
        "##..#.##..",
        "#.##...##."
    ], 

    "Tile 3079": [
        "#.#.#####.",
        ".#..######",
        "..#.......",
        "######....",
        "####.#..#.",
        ".#...#.##.",
        "#.#####.##",
        "..#.###...",
        "..#.......",
        "..#.###..."
    ]
}

grid = construct_image(tiles)
if grid is not None:
    print("Constructed Image Grid:")
    for row in grid:
        print(row)

    corner_tiles = identify_corner_tiles(grid)
    print("Corner Tiles: ")
    for tile_id in corner_tiles:
        print(tile_id)

    answer = calculate_answer(corner_tiles)
    print(f"Final answer: {answer}")
else:
    print("No valid arrangement found.")