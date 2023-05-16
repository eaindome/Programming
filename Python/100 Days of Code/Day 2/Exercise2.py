## Math Operators

# Instructions
'''
Write a program that calculates the BOdy mass Index (BMI) from
a user's weight and height.
The BMI is a measure of some's weight taking into account their 
height. e.g. If a tall person and a short person both weigh the same 
amount, the short person is usually more overweight.
The BMI is calculated by dividing a person's weight(in kg) by the square
of their height (in m):
    BMI = weight(kg) / height^2(m^2)

Example Input
weight = 80
height = 1.75

Example Output
80/1.75*1.75 = 26.122448979591837
'''

# Don't change the code below:
height = input("Enter your height in m: ")
weight = input("Enter your weight in kg: ")

# write your code below this line
heit = float(height)
weit = float(weight)

bmi = weit / heit**2

bmi = weit // heit**2

print(int(bmi))

# Solution code 
bmi = int(weight) / float(height) ** 2
bmi_as_int = int(bmi)
print(bmi_as_int)

