import math

grades = [73, 67, 38, 33]

for i in range(len(grades)):
    next_multiple = math.ceil(grades[i] / 5) *5
    if (next_multiple - grades[i]) < 3 and grades[i] >= 38:
        grades[i] = next_multiple

print(f"Grades: {grades}")