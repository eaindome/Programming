'''
Create a Circle class and intialize it with radius. 
Make two methods getArea and getCircumference inside this class.
'''
from math import pi

class Circle:
    def __init__(self, radius):
        self.radius = radius

    # get area of circle
    def getArea(self):
        return pi * self.radius ** 2

    # get circumference of a circle
    def getCircumference(self):
        return 2 * pi * self.radius


# Example usage:
my_circle = Circle(3.0)
print(f"Area: {my_circle.getArea()}\n"
      f"Circumference: {my_circle.getCircumference()}")




'''
Solution:
class Circle():
    def __init__(self, radius):
        self.radius = radius
    
    def getArea(self):
        return 3.14*self.radius*self.radius
    
    def getCircumference(self):
        return self.radius*2*3.14
'''