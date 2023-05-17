# Note: Do not run

# link to Reeborg's World for the hurdle challenge
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%201&url=worlds%2Ftutorial_en%2Fhurdle1.json
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%202&url=worlds%2Ftutorial_en%2Fhurdle2.json

# This is Hurdle 2 from the drop down 

# Don't use this code in the website given
def move():
    print("Move")
def turn_left():
    print("Turn Left")
def at_goal():
    print("Flag!!!")
# Dont't use the above code in the reeborg website

def turn_right():
    turn_left()
    turn_left()
    turn_left()
    move() 
def turnLeft():
    move()
    turn_left()
    move()
def turn_again():
    turn_right()
    turn_left()
def hurdle():  
    turnLeft()
    turn_right()
    turn_again()

while not at_goal():
    hurdle()

# different solution
def turn_right():
    turn_left()
    turn_left()
    turn_left()

def jump():
    move()
    turn_left()
    move()
    turn_right()
    move()
    turn_right()
    move()
    turn_left()

while not at_goal():
    jump()