N = "North"
S = "South"
E = "East"
W = "West"
L = "Left"
R = "Right"
F = "Forward"

instructions = [
    ("F", 10),
    ("N", 3),
    ("F", 7),
    ("R", 90),
    ("F", 11)
]

move_east, move_north, move_south, move_west = 0,0,0,0
instruction = instructions[0]
direction = instruction[0]
units = instruction[1]

print(f"Instruction: {instruction}\n"
      f"Direction: {direction}\n"
      f"Units: {units}\n")
print()

for direction in instructions:
    path, units = direction
    #print(f"path: {path}\nunits: {units}")
    if path == "F":
        if direction == N:
            move_north += units
        elif direction == S:
            move_south += units
        elif direction == E:
            move_east += units
        elif direction == W:
            move_west += units
    elif path == "S":
        direction = S
        move_south += units
    elif path == "W":
        direction = W
        move_west += units
    elif path == "N":
        direction = N
        move_north += units
    elif path == "E":
        direction = E
        move_east += units
    elif path == "R":
        if units == 90:
            if direction == N:
                direction = E
            elif direction == E:
                direction = S
            elif direction == S:
                direction = W
            elif direction == W:
                direction = N
        elif units == 180:
            if direction == N:
                direction = S
            elif direction == E:
                direction = W
            elif direction == S:
                direction = N
            elif direction == W:
                direction = E
        elif units == 270:
            if direction == N:
                direction = W
            elif direction == E:
                direction = N
            elif direction == S:
                direction = E
            elif direction == W:
                direction = S
    elif path == "L":
        if units == 90:
            if direction == N:
                direction = W
            elif direction == E:
                direction = N
            elif direction == S:
                direction = E
            elif direction == W:
                direction = S
        elif units == 180:
            if direction == N:
                direction = S
            elif direction == E:
                direction = W
            elif direction == S:
                direction = N
            elif direction == W:
                direction = E
        elif units == 270:
            if direction == N:
                direction = E
            elif direction == E:
                direction = S
            elif direction == S:
                direction = W
            elif direction == W:
                direction = N

print(f"move_east: {move_east}\n"
      f"move_south: {move_south}\n"
      f"move_west: {move_west}\n"
      f"move_north: {move_north}")



