/*
Write a C++ Program to Display ASCII Value of a Character. Here’s simple C++ Program to Find ASCII Value of a Character in C++ Programming Language.

A character variable holds ASCII value (an integer number between 0 and 127) rather than that character itself in C programming. That value is known as ASCII value.

For example, ASCII value of ‘A’ is 65.

What this means is that, if you assign ‘A’ to a character variable, 65 is stored in that variable rather than ‘A’ itself.
*/

#include <iostream>

using namespace std;

int main(){
    // create and initialize variable
    char letter;

    // ask user for input
    cout<<"Enter a character or letter: ";
    cin>>letter;

    // print ascii value
    cout<<"The ASCII value of '"<<letter<<"' is "<<int(letter)<<".";
}



