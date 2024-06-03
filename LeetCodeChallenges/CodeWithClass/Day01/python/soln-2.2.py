class NumberProcessor:
    def __init__(self, n):
        self.n = n

    def subtract_product_and_sum(self):
        product = 1
        sum_of_digits = 0
        num = self.n

        while num > 0:
            digit = num%10
            product *= digit
            sum_of_digits += digit
            num //= 10

        return product - sum_of_digits
    
number = int(input('Enter number: '))
number_processor = NumberProcessor(number)
result = number_processor.subtract_product_and_sum()
print(f"Result: {result}")