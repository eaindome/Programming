// C++ recursive code for linear search
#include <bits/stdc++.h>
using namespace std;

int linearsearch(int arr[], int size, int key) {
    if (size == 0) {
        return -1;
    } else if (arr[size-1] == key) {
        // return the index of found key
        return size-1;
    }
    return linearsearch(arr, size-1, key);
}


// driver code
int main() {
    int key = 4;
    int array[] = {5,15,20,25,4,16};

    // function call
    int ans = linearsearch(array, 5, key);

    if(ans == -1){
        cout<<"Element "<<key<<" is not found."<<endl;
    } else {
        cout<<"Element "<<key<<" is found at index "<<ans<<" index of the given array."<<endl;
    }
    return 0;
}