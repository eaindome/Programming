# The array 'ar' represents a list of colors, where each color is represented by a number.
ar = [1, 2, 1, 2, 1, 3, 2]

# A dictionary 'color_count' is initialized to keep track of the count of each color in the array.
color_count = {}

# The for loop iterates over the array 'ar'.
for i in range(len(ar)):
    # If the color (ar[i]) is already in the dictionary, its count is incremented by 1.
    if ar[i] in color_count:
        color_count[ar[i]] += 1
    # If the color is not in the dictionary, it is added with a count of 1.
    else:
        color_count[ar[i]] = 1

# A variable 'pair_count' is initialized to keep track of the total number of color pairs.
pair_count = 0

# The for loop iterates over the keys (colors) in the 'color_count' dictionary.
for color in color_count:
    # The count of each color is divided by 2 using floor division (//) to find the number of pairs,
    # and this is added to the total pair count.
    pair_count += color_count[color] // 2

# The counts of each color and the total number of color pairs are printed.
print(f"Color Count: {color_count}")
print(f"Pair Count: {pair_count}")