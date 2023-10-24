"""
Assign and print the roll number, phone number and address of two students 
having names "Sam" and "John" respectively by creating two objects of the class 'Student'.
"""

# define class 
class Student:
    # initialize constructor
    def __init__(
            self, 
            name = "",
            roll_no = 0,
            address = "",
            phone_number = ""

    ):
        self.name = name
        self.roll = roll_no
        self.address = address
        self.phone = phone_number

# create objects and assign values
std1 = Student("Sam", 1, "AC204", "02439884")
std2 = Student("John", 2, "AC205", "0544148216")

# print values
print(f"Student 1:\n"
      f"Name: {std1.name}\n"
      f"Roll number: {std1.roll}\n"
      f"Adress: {std1.address}\n"
      f"Phone number: {std1.phone}\n")

print(f"Student 2:\n"
      f"Name: {std2.name}\n"
      f"Roll number: {std2.roll}\n"
      f"Adress: {std2.address}\n"
      f"Phone number: {std2.phone}\n")