from builtins import range, print


n = 5
m = 2
s = 1

candy_count = {i: 0 for i in range(1, n + 1)}
# print(f"candy_count: {candy_count}")

current_position = s
positions = []

while m > 0:
    candy_count[current_position] += 1
    positions.append(current_position)
    m -= 1
    current_position += 1
    if current_position > n:
        current_position = 1
    
print(f"positions: {positions[-1]}")
# print(f"candy_count: {candy_count}")