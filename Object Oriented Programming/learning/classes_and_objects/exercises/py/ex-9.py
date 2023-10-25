"""
Print the sum, difference and product of 
two complex numbers by creating a class named 'Complex' 
with separate functions for each operation whose real and imaginary parts 
are entered by the user.
"""

class Complex:
    # initialize constructor
    def __init__(
            self,
            real = 0,
            imaginary = 0
    ):
        self.__rel = real
        self.__img = imaginary

    def setNums(self, real, img):
        self.__rel = real
        self.__img = img

    def getReal(self):
        return self.__rel
    
    def getImg(self):
        return self.__img

    def add(self, other):
        real_sum = self.__rel + other.getReal()
        img_sum = self.__img + other.getImg()
        return Complex(real_sum, img_sum)

    def subtract(self, other):
        real_diff = self.__rel - other.getReal()
        img_diff = self.__img - other.getImg()
        return Complex(real_diff, img_diff)
    
    def multiply(self, other):
        real_product = self.__rel * other.getReal()
        img_product = self.__img * other.getImg()
        return Complex(real_product, img_product)

if __name__ == "__main__":
    num1 = Complex(4, 5)
    num2 = Complex(2, 3)

    sum_result = num1.add(num2)
    print(f"Addition: {sum_result.getReal()}+{sum_result.getImg()}j")

    diff_result = num1.subtract(num2)
    print(f"Addition: {diff_result.getReal()}+{diff_result.getImg()}j")

    product_result = num1.multiply(num2)
    print(f"Addition: {product_result.getReal()}+{product_result.getImg()}j")