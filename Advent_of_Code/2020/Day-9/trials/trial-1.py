preamble = (
    35,
    20,
    15,
    25,
    47,
    40
)

num_set = (
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
)

i = 0
sums = []
nums = []
for num in preamble:
    print(f"Num before 2nd loop: {num}")
    nums.append(num)
    print(f"Nums b4 second loop: {nums}")
    for j in preamble:
        print(f"j b4 check: {j}")
        if j not in nums:
            num += j
            print(f"Added num: [{num},]")
            if num not in sums:
                sums.append(num)
            num = nums[0]
    print(f"final sums b4 next num: {sums}\n")
    nums = []
print(sums)

outliers = []
for num in num_set[5:]:
    if num not in sums:
        outliers.append(num)

print(outliers)
if outliers:
    #print(f"First outlier: {outliers[0]}")
    ...