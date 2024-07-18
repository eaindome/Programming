from builtins import sorted, len, print


# arr = [5, 3, 1, 2, 4]
# arr = [5, 3, 1, 2, 4, 6]
arr = [0, 1, 2, 4, 6, 5, 3]

sorted_arr = sorted(arr)
n = len(sorted_arr)
middle_index = n // 2
median = sorted_arr[middle_index]
print(f"median: {median}")