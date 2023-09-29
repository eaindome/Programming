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

def main():
    with open("./input.txt", "r") as file:
        expense_report = [int(line.strip()) for line in file]
    target_sum = 2020
    result = find_two_numbers(expense_report, target_sum)

    if result:
        product = result[0] * result[1]
        print(f"Product: {product}")

if __name__ == "__main__":
    main()