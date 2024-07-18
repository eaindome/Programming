nums = [1,2,1,3]
counts = {}

for num in nums:
    if num in counts:
        counts[num] += 1
    else:
        counts[num] = 1

xor_result = 0
for num, count in counts.items():
    if count == 2:
        xor_result ^= num

print(xor_result)

