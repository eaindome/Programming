ship_x, ship_y = 0, 0  # initialize starting position
direction = "E"        # initialize starting direction

def turn_right_or_left(action, degrees):
    global direction
    directions = ["N", "E", "S", "W"]
    current_index = directions.index(direction)     # store the current direction
    # check the action
    if action == "R":
        new_index = (current_index + int(degrees/90))%4
    elif action == "L":
        new_index = (current_index - int(degrees/90))%4
    direction = directions[new_index]

def main():
    global ship_x, ship_y
    # read instruction from file
    with open("./input.txt", "r") as file:
        lines = file.readlines()

    # place instructions in this form "inst = [(action, value)]"
    instructions = []
    for line in lines:
        action = line[0]
        units = int(line[1:].strip())
        instructions.append((action, units))

    # iterate through each instruction
    # check direction and adjust x and y coordinates accordingly
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

    # calculate manhattan distance
    manhattan_distance = abs(ship_x) + abs(ship_y)
    print(f"Manhattan distance: {manhattan_distance}")

if __name__ == "__main__":
    main()