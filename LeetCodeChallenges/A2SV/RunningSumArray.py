from typing import List

class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        count = []
        add_num = 0

        for num in nums:
            add_num += num
            count.append(add_num)

        return count
        