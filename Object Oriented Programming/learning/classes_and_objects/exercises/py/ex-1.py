"""
Create a class named 'Student' with a string variable 'name' and an integer variable 'roll_no'. 
Assign the value of roll_no as '2' and that of name as "John" by creating an object of the class Student."""

# define class
class Student:
    name = ""
    roll_no = 0

# create an object
std1 = Student()

# assign values
std1.name = "John"
std1.roll_no = 2

print(f"Name: {std1.name}\n"
      f"Roll No: {std1.roll_no}")