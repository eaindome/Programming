#include <iostream>
#include <unordered_map>
#include <vector>

int linearSearchWithHashTable(std::vector<int>& arr, int target) {
    // create a hash table to map each element to its position
    std::unordered_map<int, int> hashTable;
    for (int i=0; i<arr.size(); i++) {
        hashTable[arr[i]] = i;
    }

    // search for the target element in the hash table
    if (hashTable.find(target) != hashTable.end()) {
        return hashTable[target];
    } else {
        return -1;
    }
}

int main() {
    std::vector<int> arr = {1, 5, 3, 9, 2, 7};
    int target = 9;

    int index = linearSearchWithHashTable(arr, target);
    if (index != -1) {
        std::cout<<"Found "<<target<<" at index "<<index<<std::endl;
    } else {
        std::cout<<target<<" not found in the list"<<std::endl;
    }
}