from builtins import print, set, max, len


arr = [3, 3, 2, 1, 3]
arr = [1, 2, 2, 3]
set_arr = set(arr)
# print(f"Set: {set_arr}")
# print(f"Max: {max(set_arr, key=arr.count)}")
# print(f"Count: {arr.count(max(set_arr, key=arr.count))}")

max_count = max(set_arr, key=arr.count)
deletions = len(arr) - arr.count(max_count)

print(f"Deletions: {deletions}")

