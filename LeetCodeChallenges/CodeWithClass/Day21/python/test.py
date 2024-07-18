g = [1, 2, 3]       # g = greed factor
s = [1, 1]          # s = size of cookies
content = 0         # content = number of children that can be satisfied

# Sort the lists
g.sort()
s.sort()

i = 0       # i = index of g

# Iterate through the sizes of the cookies
for size in s:
    # If the size of the cookie is greater than or equal to the greed factor
    if size >= g[i]:
        content += 1        # Increment the content
        i += 1              # Increment the index of g
        if i == len(g):     # If the index of g is equal to the length of g
            break           # Break the loop

print(f"Content: {content}")
