nums = [-1,0,1,2,-1,-4]
output = []

for i in range(len(nums)-2):
    # Skip duplicate numbers
    if i > 0 and nums[i] == nums[i-1]:
        continue
    left, right = i+1, len(nums)-1
    while left < right:
        total = nums[i] + nums[left] + nums[right]
        if total < 0:
            # If the sum is less than 0, move the left pointer to the right
            left += 1
        elif total > 0:
            # If the sum is greater than 0, move the right pointer to the left
            right -= 1
        else:
            # If the sum is 0, append the triplet and move both pointers
            output.append([nums[i], nums[left], nums[right]])
            while left < right and nums[left] == nums[left+1]:
                left += 1
            while left < right and nums[right] == nums[right-1]:
                right -= 1
            left += 1
            right -= 1