g = [1, 2, 3]       # g = greed factor
s = [1, 1]          # s = size of cookies
content = 0         # content = number of children that can be satisfied

# sort the list
g.sort()
s.sort()

# iterate through the sizes of the cookies
for i, size in enumerate(s[:min(len(s), len(g))]):
    # if the size of the cookie is greater than or equal to the greed factor
    if size >= g[i]:
        content += 1        # increment the content


print(f"Content: {content}")