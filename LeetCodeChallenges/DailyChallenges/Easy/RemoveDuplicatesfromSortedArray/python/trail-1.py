nums = [1,1,2]

for i in range(1, len(nums)):
    if nums[i] == nums[i-1]:
        if i+1 < len(nums):
            nums[i] = nums[i+1]
        else:
            nums[i] = 'x'

nums.remove('x')

print(nums)