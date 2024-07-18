nums = [-1,0,1,2,-1,-4]
output = []
seen = set()

for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        for k in range(j+1, len(nums)):
            if nums[i] + nums[j] + nums[k] == 0:
                triplet = tuple(sorted([nums[i], nums[j], nums[k]]))
                if triplet not in seen:
                    output.append(list(triplet))
                    seen.add(triplet)

print(f"Output: {output}")