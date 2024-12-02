from typing import List

class Solution:
    def leftRightDifference(self, nums: List[int]) -> List[int]:
        left_sum = []
        right_sum = []

        # left sum
        left_add = 0
        for i in range(len(nums)):
            if i == 0:
                left_sum.append(0)
            else:
                left_add += nums[i-1]
                left_sum.append(left_add)

        # right sum
        right_add = 0
        for i in range(len(nums) - 1, -1, -1):
            if i == len(nums) - 1:
                right_sum.append(0)
            else:
                right_add += nums[i + 1]
                right_sum.append(right_add)

        right_sum.reverse()
        return [abs(left_sum[i] - right_sum[i]) for i in range(len(left_sum))]