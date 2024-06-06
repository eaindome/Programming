from typing import List
from memory_profiler import profile

class Solution:
    @profile
    def plusOne(self, digits: List[int]) -> List[int]:
        return [int(char) for char in str(int(''.join([str(i) for i in digits]))+1)]
    
# Create an instance of the Solution class
solution = Solution()
print(f"Solution: {solution.plusOne([1,2,3,4])}")	