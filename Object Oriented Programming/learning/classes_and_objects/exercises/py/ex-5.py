"""
Write a program to print the area of two rectangles having sides 
(4,5) and (5,8) respectively by creating a class named 'Rectangle' 
with a function named 'Area' which returns the area. 
Length and breadth are passed as parameters to its constructor.
"""

# define class
class Rectangle:
    # initialize constructor
    def __init__(
            self,
            length = 0.0,
            breadth = 0.0
    ):
        self.len = length
        self.brd = breadth

    def calculateArea(self):
        return self.len*self.brd
    
# create objects class
rect1 = Rectangle(4, 5)
rect2 = Rectangle(5, 8)

# calculate area and display results
print(f"Area of rect 1: {rect1.calculateArea()}\n"
      f"Area of rect 2: {rect2.calculateArea()}")