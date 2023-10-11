from math import pi, cos, sin

ship_x, ship_y = 0, 0       # initial position on x and y coordinates
waypoint_x, waypoint_y = 10, 1   # waypoint position relative to the ship

# read instructions from file
with open("./input.txt", "r") as file:
    lines = file.readlines()

instructions = []
for line in lines:
    action = line[0]
    units = int(line[1:].strip())
    instructions.append((action, units))

def rotate_waypoint_right_or_left(action, degrees):
    global waypoint_x, waypoint_y
    radians = degrees * (pi/180.0)
    if action == "R":
        new_x = waypoint_x * round(cos(radians)) + waypoint_y * round(sin(radians))
        new_y = -waypoint_x * round(sin(radians)) + waypoint_y * round(cos(radians))
        waypoint_x, waypoint_y = new_x, new_y
    elif action == "L":
        new_x = waypoint_x * round(cos(radians)) - waypoint_y * round(sin(radians))
        new_y = waypoint_x * round(sin(radians)) + waypoint_y * round(cos(radians))
        waypoint_x, waypoint_y = new_x, new_y

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
        rotate_waypoint_right_or_left(action, units)

manhattan_distance = abs(ship_x) + abs(ship_y)
print(f"Manhattan distance: {manhattan_distance}")


