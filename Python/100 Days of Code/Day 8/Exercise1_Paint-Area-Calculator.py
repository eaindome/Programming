# Area Calc

## Instructions
'''
You are painting a wall. The instructions on the paint can says that 1
can of paint can cover 5 squares meters of wall. Given a random height and 
width of wall, calculate how many cans of paint you'll need to buy.

number of cans = (wall heigth * wall width) / coverage per can.

e.g. Height = 2, Width = 4, Coverage = 5

number of cans = (2*4) / 5 = 1.6

But because you can't buy 0.6 of a can of paint, the result should be rounded
up to 2 cans.
'''
import math

# Write your code below this line
def paint_calc(height, width, cover):
    number_of_cans = (height * width) / cover
    print(f"The number of cans needed is: {math.ceil(number_of_cans)} cans")
# Write  your code above this line

# Don't change the code below
test_h = int(input("Height of wall: "))
test_w = int(input("Width of wall: "))
coverage = 5
paint_calc(height=test_h, width=test_w, cover=coverage)

# a different solution
def paint_calc(height, width, cover):
    area = height * width
    num_of_cans = math.ceil(area / cover)
    print(f"You'll need {num_of_cans} cans of paint.")
