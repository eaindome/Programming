'''
Create a Student class and initialize it with name and roll number. Make methods to :
1. Display - It should display all informations of the student.
2. setAge - It should assign age to student
3. setMarks - It should assign marks to the student.
'''

class Student:
    def __init__(self, name, roll_num):
        self.name = name
        self.roll = roll_num
        self.age = None
        self.marks = None

    def displayInfo(self):
        print(f"Student Information of {self.name}:\n"
              f"Name: {self.name}\n"
              f"Roll Number: {self.roll}")
        if self.age is not None:
            print(f"Age: {self.age}")
        if self.marks is not None:
            print(f"Marks: {self.marks}")
        
    def setAge(self, age):
        self.age = age

    def setMarks(self, marks):
        self.marks = marks
        
# Example usage
student1 = Student("John", 101)
student1.setAge(20)
student1.setMarks(70)
student1.displayInfo()
print()
student2 = Student("Alice", 102)
student2.setAge(22)
student2.displayInfo()


'''
Solution:
class Student():
  def __init__(self,name,roll):
    self.name = name
    self.roll= roll
  def display(self):
    print self.name
    print self.roll
  def setAge(self,age):
    self.age=age
  def setMarks(self,marks):
    self.marks = marks
'''