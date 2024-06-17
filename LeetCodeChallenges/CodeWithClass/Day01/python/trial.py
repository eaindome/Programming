import math

class Solution:
    def __init__(self, n):
        self.n = n

    def subtract_product_and_sum(self):
        num = self.n

        num_dig = [int(d) for d in str(num)]

        sum_num = sum(num_dig)
        product = math.prod(num_dig)

        return product - sum_num
    
number = int(input('Enter number: '))
number_processor = Solution(number)
result = number_processor.subtract_product_and_sum()
print(f"Result: {result}")



'''
num = 243

num_dig = [int(d) for d in str(num)]
sum_num = sum(num_dig)
product = math.prod(num_dig)
print(f"Sum Num: {sum_num}")
print(f"Product: {product}")
'''