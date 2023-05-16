/*
Write a C++ Program to find Square Root of a number using sqrt() function. Here’s simple program to find Root of a Number using sqrt() function in C++ Programming Language.

Square root in C++ can be calculated using sqrt() function defined in math.h header file. This function takes a number as an argument and returns the square root of that number.
*/

#include <iostream>
#include <math.h>
#include <windows.h>

using namespace std;

int main(){
    // create and initialize variable
    int num;
    double sqt;
    char again;
    bool end = false;

    while(!end){
        // clear console window
        system("cls");

        // ask user for input
        cout<<"Enter the number you want its square root: ";
        cin>>num;

        sqt = sqrt(num);

        cout<<"Squar root of "<<num<<" is "<<sqt<<endl<<endl;

        cout<<"Do you want to find another one? \n"
            <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
        cin>>again;
        if(again == '2'){
            end = true;
        }
    }

    cout<<"Ending the program...";

    return 0;
}















