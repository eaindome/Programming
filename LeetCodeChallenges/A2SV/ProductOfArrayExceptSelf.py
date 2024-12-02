from typing import List


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        product_list = [1] * len(nums)

        prefix = 1
        for _ in range(len(nums)):
            product_list[_] = prefix
            prefix *= nums[_]
        
        suffix = 1
        for _ in range(len(nums) - 1, -1, -1):
            product_list[_] *= suffix
            suffix *= nums[_]

        return product_list