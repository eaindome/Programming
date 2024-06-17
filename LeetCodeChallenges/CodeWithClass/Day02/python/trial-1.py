nums = [4, 3, 2, 7, 8, 2, 3, 1]
num_not_in_list = []

max_num = max(nums)
min_num = min(nums)

for i in range(min_num, max_num+1):
    if i not in nums:
        num_not_in_list.append(i)

print(num_not_in_list)