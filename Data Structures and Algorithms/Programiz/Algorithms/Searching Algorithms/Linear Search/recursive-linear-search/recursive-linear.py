# Python Program to Implement Linear Search Recursively


def linear_search(arr, size, key):

    # If the array is empty we will return -1
    if (size == 0):
        return -1

    elif (arr[size - 1] == key):

        # Return the index of found key.
        return size - 1
    
    return linear_search(arr, size - 1, key)


# Driver code
if __name__ == "__main__":
    arr = [5, 15, 6, 9, 4]
    key = 4
    size = len(arr)

    # Calling the Function
    ans = linear_search(arr, size, key)
    if ans != -1:
        print("The element", key, "is found at",
              ans, "index of the given array.")
    else:
        print("The element", key, "is not found.")
