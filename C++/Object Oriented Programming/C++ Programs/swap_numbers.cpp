/*
Write a C++ Program to Swap Two Numbers without using third variable. 
C++ Program to Swap Two Numbers without  third variable. 
Here’s simple Program to Swap Two Numbers without using temp variable in C++ Programming Language.
*/

#include <iostream>

using namespace std;

int main() {
    // create and initialize variables
    int num1, num2, temp;

    // take user input
    cout<<"Enter first number to swap with: ";
    cin>>num1;
    cout<<"Enter second number to swap with: ";
    cin>>num2;

    cout<<"\tBefore swapping"<<endl;
    cout<<"Number 1 = "<<num1<<", Number 2 = "<<num2;

    // Swap numbers
    temp = num1;
    num1 = num2;
    num2 = temp;

    cout<<endl;
    cout<<"\tAfter swapping"<<endl;
    cout<<"Number 1 = "<<num1<<", Number 2 = "<<num2<<endl;

    return 0;
}









