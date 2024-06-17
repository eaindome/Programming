def findDisappearedNumbers(nums):
    n = len(nums)

    for num in nums:
        index = abs(num) - 1
        nums[index] = -abs(nums[index])
    return [i + 1 for i in range(n) if nums[i] > 0]

# Test cases
print(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])) # [5, 6]