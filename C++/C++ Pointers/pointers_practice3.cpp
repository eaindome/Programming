/*
Write a program to print the value of the address of the pointer to a variable whose value is input from user.
*/
#include <iostream>

using namespace std;

int main(){
    int* ptr;
    int num;

    cout<<"Enter a number: ";
    cin>>num;

    ptr = &num;

    cout<<"The address of the variable is: "<<&num<<endl;
    cout<<"The address of the pointer is: "<<&ptr<<endl;
    cout<<"The value of the pointer variable is: "<<ptr<<endl;

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
    
    ptr = &num;
    cout << "The value of the address of the pointer to the number just entered is: " << ptr << endl;
    
    return 0;
}
*/





