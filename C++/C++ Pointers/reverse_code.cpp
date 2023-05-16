/*
Writing a code to reverse the digits of a number
*/

#include <iostream>

using namespace std;

int main(){
    int num, reversed_num = 0, remainder;

    cout<<"Enter a number: ";
    cin>>num;

    while(num != 0){
        remainder = num % 10;
        reversed_num = reversed_num * 10 + remainder;
        num /= 10;
    }

    cout<<"The reversed number is: "<<reversed_num<<endl;

    return 0;
}