ship_x, ship_y = 0, 0  # initialize starting position
direction = "E"        # initialize starting direction

# read instruction from file
with open("./input.txt", "r") as file:
    lines = file.readlines()

instructions = []
for line in lines:
    action = line[0]
    units = int(line[1:].strip())
    instructions.append((action, units))

def turn_right_or_left(action, degrees):
    global direction
    directions = ["N", "E", "S", "W"]
    current_index = directions.index(direction)
    if action == "R":
        new_index = (current_index + int(degrees/90))%4
    elif action == "L":
        new_index = (current_index - int(degrees/90))%4
    direction = directions[new_index]

for action, units in instructions:
    if action == "F":
        if direction == "N":
            ship_y += units
        elif direction == "S":
            ship_y -= units
        elif direction == "E":
            ship_x += units
        elif direction == "W":
            ship_x -= units
    elif action == "N":
        ship_y += units
    elif action == "S":
        ship_y -= units
    elif action == "E":
        ship_x += units
    elif action == "W":
        ship_x -= units
    elif action == "R" or action == "L":
        turn_right_or_left(action, units)

manhattan_distance = abs(ship_x) + abs(ship_y)
print(f"Manhattan distance: {manhattan_distance}")
