"""
Write a program to print the volume of a box 
by creating a class named 'Volume' with an 
initialization list to initialize its length, 
breadth and height. 
(just to make you familiar with initialization lists)
"""

class Volume:
    # initialize constructor
    def __init__(self, length, breadth, height):
        self.__len = length
        self.__brth = breadth
        self.__hgt = height

    def calculateVolume(self):
        return self.__len * self.__brth * self.__hgt

# create an object and initialize it
box = Volume(4, 3, 5)

# calculate volume and display results
print(f"Volume of box: {box.calculateVolume()}")