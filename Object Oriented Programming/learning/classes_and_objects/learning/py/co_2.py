# Creating Multiple Objects of Python Class

# define a class
class Employee:
    # define an attribute
    employee_id = 0

# create two objects of the Employee class
employee1 = Employee()
employee2 = Employee()

# access attributes using employee1 and employee2
employee1.employee_id = 1001
employee2.employee_id = 1002

print(f"Employee 1 ID: {employee1.employee_id}\n"
      f"Employee 2 ID: {employee2.employee_id}")