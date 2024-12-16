nums = [1,1,1,2,2,3]

counts = {}

k = 2
for i in range(len(nums)):
    if nums[i] in counts:
        counts[nums[i]] += 1
    else:
        counts[nums[i]] = 1

for i in range(len(nums)):
    if k < len(nums):
        if counts[nums[i]] > 2:
            nums[k] = nums[i]
            k += 1

print(k)