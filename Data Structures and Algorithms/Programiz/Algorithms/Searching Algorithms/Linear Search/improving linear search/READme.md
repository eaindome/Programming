Linear Search can be improved by using the following two methods: 
    i. Transposition
    ii. Move to Front

Transposition:
In transposition, if the key element is found, it is swapped to the element an index before to increase in a number of search count for a particular key, the search operation also optimizes and keep moving the element to the starting of the array where the searching time complexity would be of constant time

Move to Front/Head:
In this method, if the key element is found then it is directly swapped with the index 0, so that the next consecutive time, search operation for the same key element is of O(1), i.e., constant time.

Using Hash Tables:
If the list is large and we need to perform frequent searches, we can create a hash table that maps each element to its position in the list. This way, we can find the position of an element in constant time by looking up its value in the hash table.






# Credit to geeksforgeeks.org