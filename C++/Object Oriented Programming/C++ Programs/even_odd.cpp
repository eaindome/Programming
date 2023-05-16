/*
Find whether given Number is Odd or Even
Write a C++ Program to Find whether given Number is Odd or Even. Here’s simple Program to Find whether given Number is Odd or Even in C++ Programming Language.

For example if user enters an odd number like 5 then the output will be Odd number and if user enters even number like 8 then output will be Even number.
*/

#include <iostream>
#include <windows.h>

using namespace std;

int main(){
    // create and initiate variables
    int num;
    char again;
    bool end = false;

    while(!end){
        system("cls");
        cout<<"\t\t\tChecking if a number is Even / Odd"<<endl;

        // ask user for input
        cout<<"Enter the number: ";
        cin>>num;

        if(num % 2 == 0)
            cout<<num<<" is even."<<endl<<endl;
        else
            cout<<num<<" is odd."<<endl<<endl;

        cout<<"Wanna have a go again? \n"
            <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
        cin>>again;
        if(again == '2'){
            end = true;
        }
        cout<<endl;
    }

    cout<<"Ending the program...";

    return 0;
}

