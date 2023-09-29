Linear Search: 
Linear Search is defined as a sequential search algorithm that starts at one end and goes through each element of a list until the desired element is found, otherwise the search continues till the end of the data set.

How Does Linear Search Algorithm Work?
In Linear Search Algorithm, 

1. Every element is considered as a potential match for the key and checked for the same.
2. If any element is found equal to the key, the search is successful and the index of that element is returned.
3. If no element is found equal to the key, the search yields “No match found”.


Linear Search Algorithm
LinearSearch(array, key)
  for each item in the array
    if item == value
      return its index

Linear Search Complexities
Time Complexity: 
    Best Case: O(1)
    Worst Case: O(n)
    Average Case: O(n)

Space Complexity: O(1)

Drawbacks of Linear Search:
1. Linear search has a time complexity of O(N), which in turn makes it slow for large datasets.
2. Not suitable for large arrays.

When to use Linear Search?
1. When we are dealing with a small dataset.

2. When you are searching for a dataset stored in contiguous memory.
