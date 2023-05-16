/*
Write a program to print a number which is entered from keyboard using pointer.
*/
#include <iostream>

using namespace std;

int main(){
    int num;
    int* ptr;

    cout<<"Enter an number: ";
    cin>>num;

    ptr = &num;         // assign the address of num to ptr

    cout<<"The number entered is: "<<*ptr<<endl;            // print the value of the number entered using ptr

    return 0;
}


/*
Solution:
#include <iostream>
using namespace std;

int main() {
    int num;
    int* ptr;
    
    cout << "Enter a number: ";
    cin >> num;
    
    ptr = &num; // assign the address of num to ptr
    
    cout << "The number entered is: " << *ptr << endl; // print the value of the number entered using ptr
    
    return 0;
}

*/
