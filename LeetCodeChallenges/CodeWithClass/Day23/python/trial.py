# nums = [1,2,1,3]
# nums = [1,2,3]
nums = [1,2,2,1]
repeat = set()
for num in nums:
    num_count = nums.count(num)
    if num_count > 1:
        repeat.add(num)

if len(repeat) == 0:
    print(0)
else:
    xor_result = 0
    for num in repeat:
        xor_result ^= num

    print(xor_result)
