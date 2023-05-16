/*
Write a program to add two distances in inch-feet using structure. The values of the distances is to be taken from the user.
*/

#include <iostream>

using namespace std;

struct Add {
    double distance;
};

Add addition(Add, Add);

int main(){
    // declare  structure variables
    Add dist_1, dist_2, add;

    // ask user for input
    cout<<"Enter first distance: ";
    cin>>dist_1.distance;
    cout<<"Enter second distance: ";
    cin>>dist_2.distance;

    add = addition(dist_1, dist_2);

    cout<<add.distance;


    return 0;
}

Add addition(Add dist_1, Add dist_2){
    Add result;
    result.distance = dist_1.distance + dist_2.distance;
    return result;
}

