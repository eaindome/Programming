nums = [4, 3, 1, 6]
result = []
if len(nums) == 1:
    result.append(True)
else:
    for i in range(len(nums)-1):
        if (nums[i] % 2 == 0) and (nums[i+1]%2 != 0):
            result.append(True)
        else:
            result.append(False)

if False not in result:
    print(f"Special: {True}")
else:
    print(f"Special: {False}")
