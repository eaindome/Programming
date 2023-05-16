/*
Write a C++ Program to Find Quotient and Remainder of 2 numbers. Here’s simple C++ Program to Find Quotient and Remainder of 2 numbers in C++ Programming Language.

In this program, user is asked to enter two integers (divisor and dividend) and computes the quotient and remainder.
To compute quotient and remainder, both divisor and dividend should be integers.
*/

#include <iostream>

using namespace std;

int main(){
    // create and initialize variables
    int divisor, dividend, quotient, remainder;

    // ask for input
    cout<<"Enter divisor: ";
    cin>>divisor;
    cout<<"Enter dividend: ";
    cin>>dividend;

    // compute quotient and remainder
    quotient = dividend/divisor;
    remainder = dividend%divisor;

    // print out values
    cout<<"Quotient: "<<quotient<<endl;
    cout<<"Remainder: "<<remainder;

    /*
    cout<<"Quotient: "<<endl;
    cout<<dividend/divisor<<endl;
    cout<<"Remainder: "<<endl;
    cout<<dividend%divisor;*/

    return 0;
}








