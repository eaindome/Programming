# The Hurdle Challenge

# Note: Do not run

# link to Reeborg's World for the hurdle challenge
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%201&url=worlds%2Ftutorial_en%2Fhurdle1.json

# Don't use this code in the website given
def move():
    print("Move")
def turn_left():
    print("Turn Left")

# code for the hurdle
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
hurdle()
hurdle()
hurdle()
hurdle()
hurdle()
hurdle()

# using for loop
for jump in range(6):
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

jump()
jump()
jump()
jump()
jump()
jump()

# using for loop
for step in range(6):
    jump()