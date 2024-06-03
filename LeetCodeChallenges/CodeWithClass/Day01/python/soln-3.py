def subtractProductAndSum(n):
    digits = [int(digit) for digit in str(n)]
    product = 1
    sum = 0

    for digits in digits:
        product *= digits
        sum += digits

    return product - sum

num = input('Enter number: ')
result = subtractProductAndSum(num)
print(f"Result: {result}")
