import re
from collections import defaultdict
import math


class Tile:
    def __init__(self, id, image):
        self.id = id
        self.image = image
        self.size = len(image)
        self.orientation = 0

    def change_orientation(self):
        self.orientation += 1

    def __getitem__(self, coords):
        irow, icol = coords
        for _ in range(self.orientation % 4):
            irow, icol = icol, self.size - 1 - irow  # rotate

        if self.orientation % 8 >= 4:
            icol = self.size - 1 - icol  # flip vertical axis

        return self.image[irow][icol]

    def row(self, irow):
        return self.get_slice(irow, 0, 0, 1)

    def col(self, icol):
        return self.get_slice(0, icol, 1, 0)

    def top(self):
        return self.row(0)

    def bottom(self):
        return self.row(self.size - 1)

    def left(self):
        return self.col(0)

    def right(self):
        return self.col(self.size - 1)

    def __str__(self):
        return f"Tile {self.id}:\n" + "\n".join([self.row(i) for i in range(self.size)])

    def get_slice(self, irow, icol, drow, dcol):
        st = ""
        for _ in range(self.size):
            st += self[irow, icol]
            irow += drow
            icol += dcol
        return st


def parse_tiles(input):
    blocks = input.split("\n\n")
    tiles = []
    for block in blocks:
        lines = block.split("\n")
        match = re.search(r'\d+', lines[0])
        if match:
            id = int(match.group())
            image = [line for line in lines[1:] if line != ""]
            tiles.append(Tile(id, image))
    return tiles

def assemble_puzzle(input):
    tiles = parse_tiles(input)
    pairs = defaultdict(list)

    for tile in tiles:
        for _ in range(8):
            pattern = tile.top()
            if pattern not in pairs:
                pairs[pattern] = []
            pairs[pattern].append(tile)
            tile.change_orientation()

    def is_edge(pattern):
        return len(pairs[pattern]) == 1

    def get_neighbour(tile, pattern):
        return next((other for other in pairs[pattern] if other != tile), None)

    def put_tile_in_place(above, left):
        if above is None and left is None:
            for tile in tiles:
                for _ in range(8):
                    if is_edge(tile.top()) and is_edge(tile.left()):
                        return tile
                    tile.change_orientation()
        else:
            tile = above if above is not None else left
            while True:
                top_match = is_edge(tile.top()) if above is None else tile.top() == above.bottom()
                left_match = is_edge(tile.left()) if left is None else tile.left() == left.right()
                if top_match and left_match:
                    return tile
                tile.change_orientation()
        raise Exception()

    size = int(math.sqrt(len(tiles)))
    puzzle = [[None for _ in range(size)] for _ in range(size)]

    for irow in range(size):
        for icol in range(size):
            above = puzzle[irow - 1][icol] if irow > 0 else None
            left = puzzle[irow][icol - 1] if icol > 0 else None
            puzzle[irow][icol] = put_tile_in_place(above, left)

    return puzzle


def merge_tiles(tiles):
    image = []
    tile_size = len(tiles[0][0].image)
    tile_count = len(tiles)
    for irow in range(tile_count):
        for i in range(1, tile_size - 1):
            st = ""
            for icol in range(tile_count):
                st += tiles[irow][icol].row(i)[1:tile_size - 1]
            image.append(st)
    return Tile(42, image)


def match_count(image, *pattern):
    res = 0
    ccolP, crowP = len(pattern[0]), len(pattern)

    for irow in range(image.size - crowP):
        for icol in range(image.size - ccolP):
            def match():
                for icolP in range(ccolP):
                    for irowP in range(crowP):
                        if pattern[irowP][icolP] == '#' and image[irow + irowP, icol + icolP] != '#':
                            return False
                return True

            if match():
                res += 1

    return res


def part_one(input):
    tiles = assemble_puzzle(input)
    
    # Check if the puzzle size and the number of tiles are compatible
    if len(tiles) == 0:
        return 0  # No tiles available
    puzzle_size = len(tiles)
    
    if len(tiles[0]) != puzzle_size:
        return 0  # The puzzle is not square
    
    if puzzle_size * puzzle_size != len(tiles):
        return 0  # The number of tiles does not match the expected puzzle size
    
    return tiles[0][0].id * tiles[0][-1].id * tiles[-1][0].id * tiles[-1][-1].id


def part_two(input):
    image = merge_tiles(assemble_puzzle(input))

    monster = [
        "                  # ",
        "#    ##    ##    ###",
        " #  #  #  #  #  #   "
    ]

    while True:
        monster_count = match_count(image, *monster)
        if monster_count > 0:
            hash_count_in_image = str(image).count('#')
            hash_count_in_monster = "\n".join(monster).count('#')
            return hash_count_in_image - monster_count * hash_count_in_monster
        image.change_orientation()


# Usage example
input_data = "./input.txt"
print("Part One:", part_one(input_data))
print("Part Two:", part_two(input_data))
