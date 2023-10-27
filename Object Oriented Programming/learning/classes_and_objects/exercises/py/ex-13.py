'''
Write a program by creating an 'Employee' class 
having the following functions and print the final salary.
1 - 'getInfo()' which takes the salary, number of hours of work per day of employee as parameters
2 - 'AddSal()' which adds $10 to the salary of the employee if it is less than $500.
3 - 'AddWork()' which adds $5 to the salary of the employee if the number of hours of work per day is more than 6 hours.
'''

# define a class
class Employee:
    # initialize constructor
    def __init__(self, salary, num_hours):
        self.__salary = salary
        self.__num_hours = num_hours

    def getInfo(self, salary, num_hours):
        self.__salary = salary
        self.__num_hours = num_hours

    def AddSal(self):
        if self.__salary < 500:
            self.__salary += 10

    def AddWork(self):
        if self.__num_hours > 6:
            self.__salary += 5

    def getSalary(self):
        return self.__salary

# create object of class
emp = Employee(0, 0)

# take input from user
initialSalary = float(input("Enter Salary: "))
hoursWorked = int(input("Enter number of hours of work per day: "))

# call member functions
emp.getInfo(initialSalary, hoursWorked)
emp.AddSal()
emp.AddWork()

print(f"Final Salary: {emp.getSalary()}")
