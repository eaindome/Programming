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

print(f"Current col: {current_col}\n"
      f"right: {right}\n"
      f"Current col + right: {current_col+right}\n"
      f"length geological map[0]: {len(geological_map[0])}\n"
      f"modulo both results: {(current_col+right)%len(geological_map[0])}")
print()
print(f"current row: {current_row}")
print(f"current row + down: {current_row+down}")


geo_map = {
    "slope_1": "1-1",
    "slope_2": "3-1",
    "slope_3": "5-1",
    "slope_4": "7-1",
    "slope_5": "1-2"
}
right = [1, 3, 5, 7, 1]
left = [1, 1, 1, 1, 2]