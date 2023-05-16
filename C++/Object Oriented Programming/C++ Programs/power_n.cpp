/*
Write a C++ Program to raise any number X to power N. Here’s simple C++ Program to find power of a Number using pow( ) function in C++ Programming Language.
*/

#include <iostream>
#include <cmath>

using namespace std;

int main(){
    // initialize variables
    int num, exponent, result;
    char back;

    bool again = false;
    
    while(!again){
        // Ask for user input
        cout<<"Enter a number to find an exponent: ";
        cin>>num;
        cout<<"Enter the exponent : ";
        cin>>exponent;

        result = pow(num, exponent);

        cout<<"The Power of "<<num<<"^"<<exponent<<" is: "<<result<<endl<<endl;

        cout<<"Do you want to find the exponent of another number: "
            <<"\n1. Yes \n2. No"<<"\nEnter 1 or 2: ";
        cin>>back;
        if (back == '2'){
            again = true;
        }
        cout<<endl;
    }
    cout<<"Ending program...";
    return 0;
}



