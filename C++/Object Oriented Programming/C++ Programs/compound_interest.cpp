/*
Calculate Compound Interest
Write a C++ Program to Calculate Compound Interest. Here’s simple Program to Calculate Compound Interest in C++ Programming Language.

What is compound interest?
It is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously-accumulated interest.

It may be contrasted with simple interest, where interest is not added to the principal, so there is no compounding.

Annual compound interest formula
The formula for annual compound interest, including principal sum, is:

A = P (1 + r/n) (nt)

Where:

A = the future value of the investment/loan, including interest
P = the principal investment amount (the initial deposit or loan amount)
r = the annual interest rate (decimal)
n = the number of times that interest is compounded per year
t = the number of years the money is invested or borrowed for

Note that this formula gives you the future value of an investment or loan, which is compound interest plus the principal. Should you wish to calculate the compound interest only, you need this:

Total compounded interest = P (1 + r/n) (nt) – P

This program will read principal, rate and time in years and then print compound interest on entered principal for given time period.
*/

#include <iostream>
#include <windows.h>
#include <math.h>
#include <cmath>


using namespace std;

int main(){
    // create and initiate variables
    double A, P, r, n, t, CI;
    char again;
    bool end = false;
    

    while(!end){
        system("cls");
        cout<<"\t\t\t Calculation of Compound Interest"<<endl;
        // ask user for input
        cout<<"Enter Principle(Amount): ";
        cin>>P;
        cout<<"\nEnter interest rate: ";
        cin>>r;/*
        cout<<"\nEnter Number of times interest is compounded: ";
        cin>>n;*/
        cout<<"\nEnter the time period: ";
        cin>>t;

        //A = P * pow((1+r/100),t);

        // CI = A - P;

        CI = P * pow((1+r/100),t);

        cout<<"Compound Interest = "<<CI<<endl<<endl;

        cout<<"Do you want to go again? \n"
            <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
        cin>>again;
        if(again == '2')
            end = true;
        cout<<endl;
    }

    cout<<"Ending the program...";

    return 0;
}
















