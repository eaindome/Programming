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

tree = "#"
open_square = "."
right = 3
down  = 1
encounter = 0
move = 0
helper = 0

print(geological_map[0][0])

for __ in geological_map:
    char = geological_map[move][right]
    if char == '#':
        encounter += 1
    else:
        continue
    move += 1
    helper = right
    right = (helper+right)%(len(geological_map[0]))

print(encounter)