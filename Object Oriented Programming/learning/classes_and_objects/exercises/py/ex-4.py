"""
Write a program to print the area and perimeter of a triangle having sides 
of 3, 4 and 5 units by creating a class named 'Triangle' with the constructor 
having the three sides as its parameters.
"""

# define class
class Triangle:
    # initialize constructor
    def __init__(
            self, 
            side1 = 0.0,
            side2 = 0.0, 
            side3 = 0.0
    ):
        self.sid1 = side1
        self.sid2 = side2
        self.sid3 = side3

    def calculateArea(self):
        return (self.sid1 + self.sid2 + self.sid3)/2.0
    
    def calculatePerimeter(self):
        return self.sid1 + self.sid2 + self.sid3
    
# create an object of triangle and assign values
tri = Triangle(3, 4, 5)

# display area and perimeter
print(f"Area of Triangle tri: {tri.calculateArea()}\n"
      f"Perimeter of Triangle tri: {tri.calculatePerimeter()}")