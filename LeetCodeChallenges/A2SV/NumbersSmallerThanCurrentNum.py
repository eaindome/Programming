class Solution(object):
    def smallerNumbersThanCurrent(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        counts = []
        
        for i in range(len(nums)):
            count = 0
            for j in range(len(nums)):
                if (j != i) and (nums[j] < nums[i]):
                    count += 1
            counts.append(count)
        return counts