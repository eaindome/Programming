nums = [1, 1, 0, 1, 1, 1]
nums = [1,0,1,1,0,1]

max_num = 0
current_num = 0
for i in range(len(nums)):
    if nums[i] == 1:
        current_num += 1
        max_num = max(max_num, current_num)
    else:
        current_num = 0

print(f"max_num: {max_num}")