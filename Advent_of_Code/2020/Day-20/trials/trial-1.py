# Orientation and Matching Borders

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

matching_edges = find_matching_borders(tiles, "Tile 2311", "Tile 1951")
if matching_edges:
    edge1, edge2 = matching_edges
    print("Matching Edges:\n"
          f"Tile 2311 Edge: {edge1}\n"
          f"Tile 1951 Edge: {edge2}")
else:
    print("No matching edges found.")



