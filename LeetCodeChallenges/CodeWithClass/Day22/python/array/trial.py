# heights = [1,1,4,2,1,3]
# heights = [5,1,2,3,4]
heights = [1,2,3,4,5]
sorted_heights = sorted(heights)

count = 0
for i, num in enumerate(sorted_heights):
    if num != heights[i]:
        count += 1

print(f"Count: {count}")