nums = [4, 3, 2, 7, 8, 2, 3, 1]

# Create a set of the numbers in the list
nums_set = set(nums)

# iterate through the range of the minimum and maximum numbers in the list
num_not_in_list = [i for i in range(1, len(nums)+1) if i not in nums_set]

print(num_not_in_list)