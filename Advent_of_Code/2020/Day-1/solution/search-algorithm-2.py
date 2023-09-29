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

def main():
    with open("./input.txt", "r") as file:
        expense_report = [int(line.strip()) for line in file]
    target_sum = 2020
    result = find_three_numbers(expense_report, target_sum)

    if result:
        product = result[0] * result[1] * result[2]
        print(f"Product: {product}")

if __name__ == "__main__":
    main()

