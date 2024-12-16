nums = [1,1,2]

k = 1
for i in range(1, len(nums)):
    print(f"i: {i}\n"
          f"nums[i]: {nums[i]}\n"
          f"nums[i - 1]: {nums[i - 1]}"
          f"nums[k]: {nums[k]}")
    if nums[i] != nums[i-1]:
        nums[k] = nums[i]
        k += 1

print(f"k: {k}")