/*
Write a program to reverse the digits a number using pointers.
*/
#include <iostream>

using namespace std;

// function prototype
void reverse_num(int* numptr);

int main(){
    int num;

    cout<<"Enter a number: ";
    cin>>num;

    reverse_num(&num);

    cout<<"The reversed number is: "<<num<<endl;

    return 0;
}

void reverse_num(int* numptr){
    int reversed_num = 0, remainder;
    while(*numptr != 0){
        remainder = *numptr % 10;
        reversed_num = reversed_num*10 + remainder;
        *numptr /= 10;
    }
    *numptr = reversed_num;
}


// reversing digit code:
/*
    while(num != 0){
        remainder = num % 10;
        reversed_num = reversed_num * 10 + remainder;
        num /= 10;
    }*/

