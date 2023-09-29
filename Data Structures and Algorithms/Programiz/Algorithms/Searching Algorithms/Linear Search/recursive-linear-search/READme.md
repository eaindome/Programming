Pseudocode for Recursive Linear Search:
LinearSearch (array, index, key):
    if index < 0:
        return -1;
    if item = key:
        return index
    return LinearSearch (array, index-1, key)

Recursive Linear Search Complexities
Time Complexity: 
    Best Case: O(1)
    Worst Case: O(n)
    Average Case: O(n)

Space Complexity: O(1)    