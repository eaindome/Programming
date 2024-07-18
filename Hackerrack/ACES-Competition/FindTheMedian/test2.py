from builtins import sorted, print, len


arr = [0, 1, 2, 4, 6, 5, 3]

sorted_arr = sorted(arr)
n = len(sorted_arr)
middle_index = n // 2

if n % 2 == 0:
    median = (sorted_arr[middle_index - 1] + sorted_arr[middle_index]) / 2
else:
    median = sorted_arr[middle_index]
print(f"median: {median}")