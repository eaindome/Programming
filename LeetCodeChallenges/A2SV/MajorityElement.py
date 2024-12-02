class Solution(object):
    def majorityElement(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        n = len(nums)
        n_times = n / 2
        count_dict = {}

        for i in nums:
            if i in count_dict:
                count_dict[i] += 1
            else:
                count_dict[i] = 1

        return max(count_dict, key=count_dict.get)