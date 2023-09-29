Sentinel Linear Search
Sentinel Linear Search is a type of Linear Search where the number of comparisons is reduced as compared to a traditional linear search. 
In this search, the last element of the array is replaced with the element to be searched and then the linear search is performed on the array without checking whether the current index is inside the index range of the array or not because the element to be searched will definitely be found inside the array even if it was not present in the original array since the last element got replaced with it. So, the index to be checked will never be out of the bounds of the array. The number of comparisons in the worst case there will be (N + 2).
The basic idea behind this algorithm is to add a sentinel value at the end of the array which is equal to the target value we are looking for. This helps to avoid checking the array boundary condition during each iteration of the loop, as the sentinel value acts as a stopper for the loop.


Method 1:
Here are the steps for Sentinel Linear Search algorithm:
1. Initialize the search index variable i to 0.
2. Set the last element of the array to the search key.
3. While the search key is not equal to the current element of the array (i.e., arr[i]), increment the search index i.
4. If i is less than the size of the array or arr[i] is equal to the search key, return the value of i (i.e., the index of the search key in the array).
5. Otherwise, the search key is not present in the array, so return -1 (or any other appropriate value to indicate that the key is not found).


Method 2 :
Here are the steps involved in the Sentinel Linear Search Algorithm:
1. Set the last element of the array to the target value. This is known as the sentinel value.
2. Set the index variable “i” to the first element of the array.
3. Use a loop to iterate through the array, comparing each element with the target value.
4. If the current element is equal to the target value, return the index of the current element.
5. Increment the index variable “i” by 1 after each iteration of the loop.
6. If the loop completes and the target value is not found, return -1 to indicate that the value is not present in the array.

Sentinel Linear Search Complexities
Time Complexity: 
    Best Case: O(1)
    Worst Case: O(n)
    Average Case: O(n)

Space Complexity: O(1)