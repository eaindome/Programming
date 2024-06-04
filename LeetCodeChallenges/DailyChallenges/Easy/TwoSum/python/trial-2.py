nums = [2, 7, 11, 15]
target = 9

num_dict = {}

for i, num in enumerate(nums):
    complement = 9 - num
    if complement in num_dict:
        print([num_dict[complement], i])
        break
    num_dict[num] = i