/*
Write a C++ Program to Display Number (Entered by the User). Here’s simple Program to Print Number (Entered by the User) in C++ Programming
 Language.

This program asks user to enter a number.
When user enters an integer, it is stored in variable number using cin.
Then it is displayed in the screen using cout.

*/

#include <iostream>

using namespace std;


int main(){
    // create an integer variable
    int a;

    // ask the user for input
    cout<<"Enter an integer: ";
    cin>>a;

    cout<<endl<<"You entered "<<a<<".";

    return 0;
}

