"""
Write a program that would print the information 
(name, year of joining, salary, address) of three employees 
by creating a class named 'Employee'. The output should be as follows:
Name        Year of joining        Address
Robert        1994        64C- WallsStreat
Sam        2000        68D- WallsStreat
John        1999        26B- WallsStreat
"""

# define class
class Employee:
    # initialize constructor
    def __init__(self, name, year, address):
        self.__nme = name
        self.__yr = year
        self.__add = address

    def returnName(self):
        return self.__nme
    def returnYear(self):
        return self.__yr
    def returnAdress(self):
        return self.__add
    
# create objects of class and initialize them
empl1 = Employee("Robert", "1994", "64C-WallsStreat")
empl2 = Employee("Sam", "2000", "68D-WallsStreat")
empl3 = Employee("John", "1999", "26B-WallsStreat")

print(f"Name      Year of joining      Address")
print(f"{empl1.returnName()}       {empl1.returnYear()}             {empl1.returnAdress()}")
print(f"{empl2.returnName()}          {empl2.returnYear()}             {empl2.returnAdress()}")
print(f"{empl3.returnName()}         {empl3.returnYear()}             {empl3.returnAdress()}")