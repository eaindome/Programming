class NumberProcessor:
    def __init__(self, n):
        self.n = n

    def subtract_product_and_sum(self):
        digits = [int(d) for d in str(self.n)]
        product = 1
        sum_of_digits = 0

        for digit in digits:
            product *= digit
            sum_of_digits += digit

        return product - sum_of_digits
    
number = int(input('Enter number: '))
number_processor = NumberProcessor(number)
result = number_processor.subtract_product_and_sum()
print(f"Result: {result}")