from typing import List

def linear_search_with_hash_table(arr: List[int], target: int) -> int:
    # create a hash map/table to map each element to its position
    hash_table = {}
    for i in range(len(arr)):
        hash_table[arr[i]] = i

    # search for the target element in the hash table
    if target in hash_table:
        return hash_table[target]
    else:
        return -1
    ...


# main function
if __name__ == "__main__":
    arr = [1, 5, 3,9, 2, 7]
    target = 9

    index = linear_search_with_hash_table(arr, target)
    if index != -1:
        print(f"Found {target} at index {index}")
    else:
        print(f"{target} not found in the list")