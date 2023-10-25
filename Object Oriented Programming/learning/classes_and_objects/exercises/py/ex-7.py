"""
Write a program to print the area of a rectangle 
by creating a class named 'Area' taking the values of 
its length and breadth as parameters of its constructor and 
having a function named 'returnArea' which returns the area of the rectangle. 
Length and breadth of the rectangle are entered through keyboard.
"""

class Area:
    # initialize constructor
    def __init__(
            self,
            len = 0.0,
            brth = 0.0
    ):
        self.length = len
        self.breadth = brth
    
    def returnArea(self):
        return self.length*self.breadth
    
# initialize variable and input values
length = float(input("Enter length: "))
breadth = float(input("Enter breadth: "))

# create object of class
rectangle = Area(len=length, brth=breadth)

print(f"Area of rectangle: {rectangle.returnArea()}")




"""
### Data Encapsulation and Hiding
class Area:
    def __init(self, length=0.0, breadth=0.0):
        self.__length = length
        self.__breadth = breadth

    def setDimensions(self, length, breadth):
        self.__length = length
        self.__breadth = breadth

    def getArea(self):
        return self.__length * self.__breadth

# Initialize variable and input values
length = float(input("Enter length: "))
breadth = float(input("Enter breadth: "))

# Create an object of the class
rectangle = Area(length, breadth)

print(f"Area of rectangle: {rectangle.getArea()}")
"""