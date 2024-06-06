from typing import List
from memory_profiler import profile

class Solution:
    @profile
    def plusOne(self, digits: List[int]) -> List[int]:
        # start from the end of the list
        for i in reversed(range(len(digits))):

            # if the current digit is less than 9, increment it and return the list
            if digits[i] < 9:
                digits[i] += 1
                return digits
            
            # otherwise, set the current digit to 0 and continue the loop
            digits[i] = 0

        # if the loop completes, it means all the digits are 9
        return [1] + digits
    
solution = Solution()
print(f"Solution: {solution.plusOne([1,2,3,4])}")
print(f"Solution: {solution.plusOne([9,9,9,9])}")