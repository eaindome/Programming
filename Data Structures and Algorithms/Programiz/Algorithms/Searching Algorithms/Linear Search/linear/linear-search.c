// Linear Search in C
#include <stdio.h>

int search(int array[], int n, int x) {
    // go through array sequencially
    for (int i=0; i<n; i++)
        if (array[i] == x)
            return i;
    return -1;
}

int main() {
    int x = 1;
    int array[] = {2,4,0,1,49};
    int n = sizeof(array) / sizeof(array[0]);
    //printf("n: %d", n);

    int result = search(array, n, x);

    (result == -1) ? printf("Element not found"): printf("Element found at index: %d", result);
}