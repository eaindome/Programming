/*
Write a C++ program to Find Cube of Number using MACROS. Here’s simple program to Find Cube of Number using MACROS in C++ Programming Language.
*/

#include <iostream>

using namespace std;

#define CUBE(x)(x*x*x)

int main(){
    // create and initialize variables
    double num, cube;
    char again;
    bool end = false;

    while(!end){
        // ask for user number
        cout<<"Enter a number for its cube: ";
        cin>>num;

        cube = CUBE(num);
        
        cout<<endl;
        cout<<"The cube of "<<num<<" is "<<cube<<endl<<endl;

        cout<<"Do you want to find the cube of another number?\n";
        cout<<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
        cin>>again;

        if(again == '2')
            end = true;
        cout<<endl;
    }

    return 0;
}

