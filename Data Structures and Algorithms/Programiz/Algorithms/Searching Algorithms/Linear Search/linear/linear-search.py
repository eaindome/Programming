# Linear serach in python
def linearSearch(array, number, length):
    # go through array sequentially
    for i in range(0, length):
        if (array[i] == number):
            return i
    return -1

num = 1
array = [2, 4, 6, 8, 1, 10]
array_len = len(array)

result = linearSearch(array, num, array_len)

if result == -1:
    print("Element not found.")
else:
    print(f"Element found at index: {result}")
