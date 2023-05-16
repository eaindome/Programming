/*
Write a C++ Program to Generate Random Numbers between 0 and 100. 
Here’s simple C++ Program to Generate Random Numbers between 0 and 100 in C++ Programming Language.
*/

#include <iostream>
#include <stdlib.h>

using namespace std;

int main() {
    int a;       // loop counter
    int num;    // store number

    cout<<"Generating random numbers: "<<endl;
    for(a=0; a<=10; a++){
        num=rand()%100;
        cout<<" "<<num<<" ";
    }
    cout<<"\n";

    return 0;
}








