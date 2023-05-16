#include <iostream>

using namespace std;

int main() {
    // declare and initiate variable
    int var = 5;

    // declare pointer variable
    int* pointVar;

    // store address of var
    pointVar = &var;

    // pint value of var
    cout<<"var = "<<var<<endl;

    // print address of var
    cout<<"Address of var = "<<&var<<endl<<endl;

    // print pinter pointVar
    cout<<"pointVar = "<<pointVar<<endl;

    // print the content of the address pointVar points to
    cout<<"Content of the address pointed to by pointVar = "<<*pointVar<<endl<<endl;

    // changing value pointed by pointers
    // change value at address pointVar
    *pointVar = 1;

    cout<<var<<endl<<endl;

    //change value of var to 7
    var = 7;

    // print var
    cout<<"var = "<<var<<endl;

    // print *pointVar
    cout<<"*pointVar = "<<*pointVar<<endl<<endl;

    cout<<"Changing value of *pointVar to 16: "<<endl;
    *pointVar = 16;

    // print var
    cout<<"var = "<<var<<endl;

    // print *pointVar
    cout<<"*pointVar = "<<*pointVar<<endl;

    return 0;
}












