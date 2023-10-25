"""
Write a program to print the area of a rectangle by 
creating a class named 'Area' having two functions. 
First function named as 'setDim' takes the length and breadth of the rectangle as 
parameters and the second function named as 'getArea' returns the area of the rectangle. 
Length and breadth of the rectangle are entered through keyboard.
"""

class Area:
    # initialize constructor
    def __init__(self):
        self.__length = 0.0
        self.__breadth = 0.0

    def setDim(self, len, brth):
        self.__length = len
        self.__breadth = brth

    def getArea(self):
        return self.__length * self.__breadth
    
Rectangle = Area()

Rectangle.setDim(8, 6)
print(f"Area: {Rectangle.getArea()}")


