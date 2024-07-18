def is_special(nums):
    if len(nums) == 1:
        return True
    else:
        for i in range(len(nums)-1):
            if nums[i] % 2 == nums[i+1] % 2:
                return False
        return True
    
nums = [2,1,4]
print(f"Special: {is_special(nums)}")