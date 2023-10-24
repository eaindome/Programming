Python Class
    Syntax:
        class ClassName:
            # class definition
    
    Example:
    class Bike:
        name = ""
        gear = 0

Python Objects
    Syntax:
        objectName = ClassName()
    
    Example:
    # create class
    class Bike:
        name = ""
        gear = 0
    
    # create objects of class
    bike1 = Bike()

Access Class Atrributes Using Objects
    Syntax:
        use dot notation '.'
    
    Example:
    # modify the name attribute
    bike1.name = "Mountain Bike"

    # access the gear attribute
    bike1.gear

Python Methods
A Python Function defined inside a class is called a method.

Python Constructors
    Syntax:
        class Bike:
            # constructor function
            def __init__(self, name = ""):
                self.name = name
        
        bike1 = Bike()