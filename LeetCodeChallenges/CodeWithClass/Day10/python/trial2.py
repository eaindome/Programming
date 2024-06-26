num = 10
base = 7
digits = []

while num > 0:
    num, rmd = divmod(num, base)
    digits.append(rmd)

str_digits = ''.join(str(digit) for digit in digits[::-1])
print(f"Number in base {base}: {str_digits}")