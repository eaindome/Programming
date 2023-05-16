/*
Write a C++ Program to Multiply two Numbers. Here’s simple C++ Program to Calculate Multiplication of two Numbers in C++ Programming Language.

In this program, user is asked to enter two numbers (floating point numbers). Then, the product of those two numbers is stored in a variable and displayed on the screen.
*/

#include <iostream>

using namespace std;

int main() {
    // create and initialize variables
    int num1, num2;

    // ask user input
    cout<<"Enter integer 1: ";
    cin>>num1;
    cout<<"Enter integer 2: ";
    cin>>num2;

    // multiply numbers
    cout<<num1<<" * "<<num2<<" = "<<num1*num2;


    return 0;
}


