# While loop

'''
# revision on for loop
# Syntax for for loop:
    for item in list_of_items:
        #Do something to each item
    
        for number in rand3e(a, b):
            print(number)

# Syntax for whiel loop:
    whiel something_is_true:
        #Do something repeatedly
'''
# Note: Do not run

# link to Reeborg's World for the hurdle challenge
# https://reeborg.ca/reeborg.html?lang=en&mode=python&menu=worlds%2Fmenus%2Freeborg_intro_en.json&name=Hurdle%201&url=worlds%2Ftutorial_en%2Fhurdle1.json

# Don't use this code in the website given
def move():
    print("Move")
def turn_left():
    print("Turn Left")
# Dont't use the above code in the reeborg website

# using the hurdle challenge with the while loop
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

# using the while loop
number_of_hurdles = 6
while number_of_hurdles > 0:
    jump()
    number_of_hurdles -= 1
    