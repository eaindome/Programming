class Solution:
    def convertToBase7(self, num: int) -> str:
        if num == 0:
            return '0'
        elif num < 0:
            num = abs(num)
            return '-' + self.convertToBase(num)
        else:
            return self.convertToBase(num)
    
    def convertToBase(self, num: int) -> str:
        base = 7
        digits = []

        while num > 0:
            num, rmd = divmod(num, base)
            digits.append(rmd)

        str_digits = ''.join(str(digit) for digit in digits[::-1])
        return str_digits