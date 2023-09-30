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
right = 3
down  = 1

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

print(f"Encountered trees: {encounter}")