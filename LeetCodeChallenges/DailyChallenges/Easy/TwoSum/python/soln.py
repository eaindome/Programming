from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_dict = {}

        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_dict:
                return [num_dict[complement], i]
            num_dict[num] = i

two_sum = Solution().twoSum
print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
            
    