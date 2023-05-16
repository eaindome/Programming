#include <iostream>

using namespace std;

int main(){
    // declare variables
    int var1 = 3;
    int var2 = 24;
    int var3 = 17;

    // print address of var1
    cout<<"Address of var1 = "<<&var1<<endl;
    // print address of var2
    cout<<"Address of var1 = "<<&var2<<endl;
    // print address of var1
    cout<<"Address of var1 = "<<&var2<<endl<<endl;

    // assigning addresses to pointers
    int* pointVar, var;
    var = 5;

    // assign address of var to pointVar pointer
    pointVar = &var;

    // access value pointed by pointVar
    cout<<*pointVar<<endl<<endl;        // output = 5

    

    return 0;
}



















