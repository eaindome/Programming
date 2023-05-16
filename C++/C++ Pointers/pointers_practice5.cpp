/*
Write a function which will take pointer and display the number on screen. Take number from user and print it on screen using that function.
*/
#include <iostream>

using namespace std;

// function declaration
void display(int*);

int main(){
    int num;
    
    cout<<"Enter a number: ";
    cin>>num;

    // call display funciton with the address of num as argument
    display(&num);

    return 0;
}

// funciton definition
void display(int* no){
    // print the value of the number pointed to by no
    cout<<"The number entered is: "<<*no<<endl;
}


/*
Solution:
#include <iostream>
using namespace std;

// function prototype
void display(int* numPtr);

int main() {
    int num;

    // prompt user for input
    cout << "Enter a number: ";
    cin >> num;

    // pass the address of num to the display function
    display(&num);

    return 0;
}

// function definition
void display(int* numPtr) {
    // dereference the pointer and print the value
    cout << "The number entered is: " << *numPtr << endl;
}

*/

