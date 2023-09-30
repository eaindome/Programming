geological_map = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#"
]

# characters
tree = "#"
open_square = "."

# slope parameters
slopes = {
    "slope_1": "1-1",
    "slope_2": "3-1",
    "slope_3": "5-1",
    "slope_4": "7-1",
    "slope_5": "1-2"
}


# store total trees encountered with each different slope
trees_encountered = []

for slope in slopes:
    rig, dow = slopes[slope].split("-")
    right = int(rig)
    down = int(dow)

    # encounter
    encounter = 0

    # current position
    current_row = 0
    current_col = 0

    # traverse the map row by row
    while current_row < len(geological_map):
        # check for a tree
        if geological_map[current_row][current_col] == tree:
            encounter += 1
        
        # move right
        current_col = (current_col+right) % len(geological_map[0])

        # move down 
        current_row += down

    trees_encountered.append(encounter)

print(f"Encountered trees list: {trees_encountered}")
