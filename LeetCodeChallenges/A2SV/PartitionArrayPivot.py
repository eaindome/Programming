class Solution:
    def pivotArray(self, nums: List[int], pivot: int) -> List[int]:
        less_nums = []
        equal_nums = []
        greater_nums = []

        for num in nums:
            if num < pivot:
                less_nums.append(num)
            elif num > pivot:
                greater_nums.append(num)
            elif num == pivot:
                equal_nums.append(num)

        return less_nums + equal_nums + greater_nums
    