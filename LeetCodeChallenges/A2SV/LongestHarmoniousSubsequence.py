class Solution(object):
    def findLHS(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        max_num = 0
        num_counts = {}

        for num in nums:
            if num in num_counts:
                num_counts[num] += 1
            else:
                num_counts[num] = 1

        for num in num_counts:
            if num + 1 in num_counts:
                longest_subsequence = num_counts[num] + num_counts[num + 1]
                max_num = max(max_num, longest_subsequence)
        return max_num