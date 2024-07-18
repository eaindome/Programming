from builtins import min, print, len


arr = [5, 4, 4, 2, 2, 8]
# arr = [1, 2, 3, 4, 3, 3, 2, 1]
sticks_cut = []

while len(arr) > 0:
    print(len(arr))
    sticks_cut.append(len(arr))
    min_val = min(arr)
    arr = [i - min_val for i in arr if i - min_val > 0]

print(f"sticks_cut: {sticks_cut}")


# for i in arr:
#     min_val = min(arr)
#     result = i - min_val
#     if result > 0:
#         sticks_cut.append(result)
#     arr = sticks_cut


# arr = [i - min_val for i in arr if i - min_val > 0]

