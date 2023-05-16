/*

*/

// printing variable addresses in C++
#include <iostream>

using namespace std;

int main(){
    // the reference operator '&'
    // declare variables
    int var1 = 3;
    int var2 = 24;
    int var3 = 17;

    // print address of var1
    cout<<"Address of var1: "<<&var1<<endl;

    // print address of var1
    cout<<"Address of var2: "<<&var2<<endl;

    // print address of var1
    cout<<"Address of var3: "<<&var3<<endl;


    // Pointers
    // pointer operator '*'
    // preferred syntax -> datatype* variable, eg.
    int* pointVar, var;


    /*Assigning Addresses to pointers*/
    var = 5;

    // assign address of var to pointVar pointer
    pointVar = &var;

    // access value pointed by pointVar
    cout<<*pointVar<<endl;

    // When '*' is usedwith pointers, it's called the dereference operator.
    // It operates on a pointer and gives the value pointed by the 
    // address stored in the pointer. 

    return 0;
}










