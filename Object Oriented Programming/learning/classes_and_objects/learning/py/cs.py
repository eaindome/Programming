# demonstrating python constructors

# define class
class Bike:
    # constructor function    
    def __init__(self, name = ""):
        self.name = name

bike1 = Bike("Mountain Bike")