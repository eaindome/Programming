"""
Write a program to print the area and perimeter of a triangle having sides 
of 3, 4 and 5 units by creating a class named 'Triangle' with a function to 
print the area and perimeter.
"""

# define class
class Triangle:
    # initialize side variables
    side1, side2, side3 = 0.0, 0.0, 0.0

    @staticmethod
    def printArea(side1, side2, side3):
        area = (side1+side2+side3)/2.0
        print(f"Area: {area}\n"
              f"Perimeter: {(side1+side2+side3)}")
    
# create an object of the class
Triangle.printArea(3, 4, 5)


"""
The printArea function is defined as a static method using the @staticmethod decorator. 
This allows you to call the method without creating an instance of the class.
"""