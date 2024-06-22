# Import the print, set, max, and len functions from the builtins module
# This is usually not necessary in Python 3, but can be used for compatibility with Python 2
from builtins import print, set, max, len

# Initialize the array of integers
# You can use either this list
arr = [3, 3, 2, 1, 3]
# Or this list, but not both
# arr = [1, 2, 2, 3]

# Create a set from the array to get the unique elements
set_arr = set(arr)

# Find the element in the set that appears most frequently in the array
# This is done using the max function with arr.count as the key function
# The max function will return the element for which arr.count returns the highest value
max_count = max(set_arr, key=arr.count)

# Calculate the number of deletions required to make all elements in the array equal to the most frequent element
# This is done by subtracting the count of the most frequent element from the total number of elements in the array
deletions = len(arr) - arr.count(max_count)

# Print the number of deletions
print(f"Deletions: {deletions}")