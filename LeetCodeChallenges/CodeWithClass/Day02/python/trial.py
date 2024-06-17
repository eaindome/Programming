nums = [4, 3, 2, 7, 8, 2, 3, 1]

for num in nums:
    index = abs(num) - 1
    print(f"num: {num}, index: {index}, nums[index]: {nums[index]}")

    nums[index] = -abs(nums[index])
    print(f"nums[index]: {nums[index]}")
    print()

print("nums[i] > 0")
print([i + 1 for i in range(len(nums)) if nums[i] > 0])
print("nums[i] < 0")
print([i + 1 for i in range(len(nums)) if nums[i] < 0])
print()