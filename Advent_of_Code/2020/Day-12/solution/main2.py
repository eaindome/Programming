from math import pi, cos, sin

ship_x, ship_y = 0, 0       # initial position of ship on x and y coordinates
waypoint_x, waypoint_y = 10, 1  # waypoint position relative to the ship

def rotate_waypoint_right_left(action, degrees):
    global waypoint_x, waypoint_y       # access the global variable waypoint
    radians = degrees * (pi/180.0)      # find degrees in radians
    if action == "R":
        new_x = waypoint_x * round(cos(radians)) + waypoint_y * round(sin(radians))
        new_y = -waypoint_x * round(sin(radians)) + waypoint_y * round(cos(radians))
        waypoint_x, waypoint_y = new_x, new_y
    elif action == "L":
        new_x = waypoint_x * round(cos(radians)) - waypoint_y * round(sin(radians))
        new_y = waypoint_x * round(sin(radians)) + waypoint_y * round(cos(radians))

def main():
    global ship_x, ship_y               # access the global variable ship_x, ship_y

    # read instruction from file
    with open("./input.txt", "r") as file:
        lines = file.readlines()

    # initialize list to store instructions
    instructions = []
    for line in lines:
        action = line[0]        # store initial value as action
        units = int(line[1:].strip())   # store remaining value as units and convert to integer
        instructions.append((action, units))   # add action and value to the instruction list as a set

    # iterate through instruction list
    for action, units in instructions:
        if action == "F":
            ship_x += units * waypoint_x
            ship_y += units * waypoint_y
        elif action == "N":
            waypoint_y += units
        elif action == "S":
            waypoint_y -= units
        elif action == "E":
            waypoint_x += units
        elif action == "W":
            waypoint_x -= units
        elif action == "R" or action == "L":
            rotate_waypoint_right_left(action, units)

    print(f"Manhattan distance: {abs(ship_x) + abs(ship_y)}")

if __name__ == "__main__":
    main()


