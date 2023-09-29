// Linear Search in C++
#include <iostream>
using namespace std;

int search(int array[], int x, int n) {
    // go through array sequentially
    for (int i=0; i<n; i++) {
        if (array[i] == x)
            return i;
    }
    return -1;
}

int main() {
    int x = 1;
    int array[] = {2,4,6,8,1,10};
    int n = sizeof(array)/sizeof(array[0]);

    int result = search(array, x, n);

    (result == -1) ? cout<<"Element not found" : cout<<"Element found at index: "<<result;
}