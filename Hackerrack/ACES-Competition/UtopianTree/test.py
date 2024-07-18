n = 5
height = 1

for i in range(1, n+1):
    if i%2 == 0:
        height += 1
    else:
        height *= 2

print(f"Height: {height}")