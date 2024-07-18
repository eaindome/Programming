# Import the min, print, and len functions from the builtins module
# This is usually not necessary in Python 3, but can be used for compatibility with Python 2
from builtins import min, print, len

# Initialize the array of stick lengths
arr = [5, 4, 4, 2, 2, 8]

# Initialize an empty list to store the number of sticks cut in each operation
sticks_cut = []

# Continue the loop as long as there are sticks left
while len(arr) > 0:
    # Print the current number of sticks
    print(len(arr))
    
    # Append the current number of sticks to the sticks_cut list
    sticks_cut.append(len(arr))
    
    # Find the smallest stick length
    min_val = min(arr)
    
    # Cut the smallest length from all sticks, and remove any sticks that have been fully cut
    arr = [i - min_val for i in arr if i - min_val > 0]

# Print the list of number of sticks cut in each operation
print(f"sticks_cut: {sticks_cut}")