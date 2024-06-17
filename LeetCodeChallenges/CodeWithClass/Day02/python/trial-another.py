from typing import List
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ref = [False]*n
        for num in nums:
            ref[num-1] = True
        return [i+1 for i in range(n) if not ref[i]]