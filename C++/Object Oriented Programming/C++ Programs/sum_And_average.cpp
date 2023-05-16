/*
Write a C++ Program to Find Sum and Average of three numbers. Here’s simple C++ Program to Find Sum and Average of three numbers in C++ Programming Language.
*/

#include <iostream>

using namespace std;

int main(){
    // create and intiate variables
    float sum1, sum2, avg;
    int total = 0;
    bool end = false;
    string choice;

    cout<<endl;
    cout<<"\tFinding Sum of numbers";

    sum1, sum2 , avg = 0;
    while(!end){
        cout<<endl<<"Enter a number: ";
        float num;
        cin>>num;
        sum1 += num;
        cout<<"Current sum = "<<sum1<<endl<<endl;

        cout<<"Do you want to end? \n"<<"Enter 'y' or 'n': ";
        cin>>choice;
        if (choice == "y"){
            end = true;
        }
    }

    cout<<endl<<"Final Sum = "<<sum1<<endl<<endl;
    cout<<"\tFinding average of numbers";

    end = false;
    while(!end){
        cout<<endl<<"Enter a number: ";
        float num;
        cin>>num;
        sum2 += num;
        cout<<"Current sum = "<<sum2<<endl;
        total += 1;
        cout<<"total num = "<<total<<endl<<endl;

        cout<<"Do you want to end? \n"<<"Enter 'y' or 'n': ";
        cin>>choice;
        if (choice == "y"){
            avg = sum2 / total;
            cout<<"Average = "<<avg<<endl;
            end = true;
        }
    }

    cout<<endl<<"Finished Program.";

}



