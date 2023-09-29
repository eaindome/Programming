def find_two_numbers(nums, target):
    num_to_index = {}   # a hash map to store numbers

    for i, num in enumerate(nums):
        complement = target - num

        # check if the complement exists in the hash map
        if complement in num_to_index:
            # return the pair of numbers that sum to the target
            return [num, nums[num_to_index[complement]]]
        
        # store the current number and its index in the hash map
        num_to_index[num] = i
    
    # if no pair is found, return an empty list or handle it as needed
    return []

# example usage:
expense_report = [1721, 979, 366, 299, 675, 1456]
target_sum = 2020
result = find_two_numbers(expense_report, target_sum)

if result:
    product = result[0] * result[1]
    print(f"The two numbers are: {result[0]} and {result[1]}\n"
          f"Their product is: {product}")
else:
    print("No two numbers sum up to their target")