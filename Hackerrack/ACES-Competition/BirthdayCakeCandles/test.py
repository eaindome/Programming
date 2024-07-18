candles = [4, 4, 1, 3]
candles = [3, 2, 1, 3]

highest = 0

for i in candles:
    if i > highest:
        highest = i

num_highest = candles.count(highest)
print(f"Number of highest: {num_highest}")