def find_three_numbers(nums, target):
    nums.sort() # sort the list in ascending order
    n = len(nums)

    for i in range(n-2):
        left = i + 1
        right = n -1
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            if current_sum == target:
                # found a triplet that sums to the target
                return [nums[i], nums[left], nums[right]]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
    
    # if no triplet if found, return an empty list or handle it as needed
    return []

# example usage:
expense_report = [1721, 979, 366, 299, 675, 1456]
target_sum = 2020
result = find_three_numbers(expense_report, target_sum)

if result:
    product = result[0] * result[1] * result[2]
    print(f"The three numbers are: {result[0]}, {result[1]} and {result[2]}\n"
          f"Their product is: {product}")
else:
    print("No two numbers sum up to their target")