/*
Write a program that prompts the user to enter two integers.

The program outputs how many numbers are multiples of 3 and how many numbers are multiples of 5 between the two integers (inclusive)
*/


#include <iostream>

using namespace std;

int main(){
    // create and initiate variables
    int num1, num2;
    int count1 = 0;
    int count2 = 0;
    char again;
    bool end = false;

    while(!end){
        // Ask user for input
        cout<<"Enter first number: ";
        cin>>num1;
        cout<<"Enter the second number: ";
        cin>>num2;

        for(int i = num1; num2-i; i++){
            if(i%3==0){
                //cout<<"Multiple of 3: "<<i<<endl;
                count1++;
            }
            else if (i%5==0){
                //cout<<"Multiple of 5: "<<i<<endl;
                count2++;
            }
        }

        cout<<"The number of multiples of 3 between "
            <<num1<<" and "<<num2<<" = "<<count1<<endl;
        cout<<"The number of multiples of 5 between "
            <<num1<<" and "<<num2<<" = "<<count1<<endl<<endl;

        cout<<"Do you want to again? \n"
            <<"1. Yes \n"
            <<"2. No \n"<<"Enter 1 or 2: ";
        cin>>again;
        if(again=='2'){
            end=true;
        }
        cout<<endl;
    }

    //cout<<endl;
    cout<<"Ending program...";

    return 0;
}





