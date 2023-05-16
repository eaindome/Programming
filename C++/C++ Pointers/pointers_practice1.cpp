/*
Write a program to print the address of a variable whose value is input from user.
*/
#include <iostream>

using namespace std;

int main(){
    int* address;
    int num;

    cout<<"Enter a number: ";
    cin>>num;
    address = &num;

    cout<<"The address of the number just entered is: "<<address<<endl;

    return 0;
}


/*
Solution:
#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    cout << "The address of the number just entered is: " << &num << endl;
    return 0;
}
*/






















