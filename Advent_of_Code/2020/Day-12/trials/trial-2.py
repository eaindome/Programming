ship_x, ship_y = 0, 0      # starting position
direction = "E"           # starting direction

# navigation instructions
instructions = [
    ("F", 10),
    ("N", 3),
    ("F", 7),
    ("R", 90),
    ("F", 11)
]

for action, units in instructions:
    if action == "F":
        if direction == "N":
            ship_y += units
        elif direction == "S":
            ship_y -= units
        elif direction == "E":
            ship_x += units
        elif direction == "W":
            ship_x -+ units
    elif action == "N":
        ship_y += units
    elif action == "S":
        ship_y -= units
    elif action == "E":
        ship_x += units
    elif action == "W":
        ship_x -= units
    elif action == "R":
        directions = ["N", "E", "S", "W"]
        current_index = directions.index(direction)
        new_index = (current_index + int(units/90))%4
        direction = directions[new_index]
    elif action == "L":
        directions = ["N", "E", "S", "W"]
        current_index = directions.index(direction)
        new_index = (current_index - int(units/90))%4
        direction = directions[new_index]

manhattan_distance = abs(ship_x) + abs(ship_y)
print(f"Manhattan distance: {manhattan_distance}")

