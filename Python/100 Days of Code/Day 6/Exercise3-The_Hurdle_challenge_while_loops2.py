# Note: Do not run

# link to Reeborg's World for the hurdle challenge
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%201&url=worlds%2Ftutorial_en%2Fhurdle1.json
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%202&url=worlds%2Ftutorial_en%2Fhurdle2.json
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%203&url=worlds%2Ftutorial_en%2Fhurdle3.json

# This is Hurdle 3 from the drop down 

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
# Dont't use the above code in the reeborg website


def turn_right():
    turn_left()
    turn_left()
    turn_left()
    if not wall_in_front():
        move()
    
def forward():
    if front_is_clear():
        move()
    else:
        turn_left()
        move()
        turn_right()
        turn_right()
        turn_left()
        
while not at_goal():
    forward()

# a different solution
def turn_right():
    turn_left()
    turn_left()
    turn_left()

def jump():
    turn_left()
    move()
    turn_right()
    move()
    turn_right()
    move()
    turn_left()

while not at_goal():
    if wall_in_front():
        jump()
    else:
        move()