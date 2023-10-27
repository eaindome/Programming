'''
Add two distances in inch-feet by creating a class named 'AddDistance'.
'''

# define class
class AddDistance:
    # initialize constructor
    def __init__(self, distance1, distance2):
        self.__dist1 = distance1
        self.__dist2 = distance2

    def toFeet(self):
        sum = self.__dist1 + self.__dist2
        return sum * 0.083333333
    
# create object of class
distances = AddDistance(12.0, 6.0)
print(f"Total distances in feet: {distances.toFeet()}")