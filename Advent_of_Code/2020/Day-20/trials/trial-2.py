# 1. Orientation and Matching Borders
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

# 2. Construct a grid image to represent the larger square image
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
    return grid

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
print("Constructed Image Grid:")
for row in grid:
    print(row)


