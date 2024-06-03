class NumberOperations:
    def __init__(self, num):
        self.num = num

    def calculate_sum_and_product(self):
        sum, product = 0, 1
        for i in self.num:
            sum += int(i)
            product *= int(i)
            result = product - sum
        return sum, product, result
    
    def display_results(self):
        sum, product, result = self.calculate_sum_and_product()
        print(f"Sum: {sum}\nProduct: {product}\nResult: {result}")

if __name__ == "__main__":
    num = input('Enter number: ')
    number_operations = NumberOperations(num)
    number_operations.display_results()
