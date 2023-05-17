# Note: Do not run

# link to Reeborg's World for the hurdle challenge
#https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Maze&url=worlds%2Ftutorial_en%2Fmaze1.json

# This is Maze from the drop down 

# Don't use this code in the website given
def move():
    print("Move")
def turn_left():
    print("Turn Left")
def at_goal():
    print("Flag!!!")
def wall_in_front():
    print("Wall in front")
def front_is_clear():
    print("Front is clear")
def right_is_clear():
    print("Right is clear")
def wall_on_right():
    print("Wall on the right")
# Dont't use the above code in the reeborg website

def turn_right():
    turn_left()
    turn_left()
    turn_left()

def front_is_clear():
    move()
turn_left()

while not at_goal():
    if right_is_clear():
        turn_right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()

