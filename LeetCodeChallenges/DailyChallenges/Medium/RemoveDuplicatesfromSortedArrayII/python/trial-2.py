nums = [0,0,1,1,1,1,2,3,3]

k = 2

for i in range(2, len(nums)):
    if nums[i] != nums[k - 2]:
        nums[k] = nums[i]
        k += 1

print(f"k: {6}")