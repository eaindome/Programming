num1 = 10
num2 = num1
base = 7
remainder = []

while num2 > 0:
    num2 = num1 // base
    rmd = num1 - (base*num2)
    remainder.append(rmd)
    num1 = num2

str_numbers = ''.join(str(num) for num in remainder[::-1])
print(f"Remainder: {str_numbers}")

