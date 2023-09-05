from turtle import *
from random import random

TMNT = Turtle()
color_list = ["Blue", "Red", "Orange", "Violet"]

t = Turtle()
'''
for steps in range(100):
    for c in color_list:
        TMNT.color(c)
        TMNT.forward(steps)
        TMNT.right(30)
'''

for i in range(100):
    steps = int(random() * 100)
    angle = int(random() * 360)
    t.right(angle)
    t.fd(steps)

t.screen.mainloop()

'''
my_screen = Screen()
print(my_screen.canvheight)
my_screen.exitonclick()'''