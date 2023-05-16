/*
As we know, inheritance is a feature of OOP that allows us to create derived classes from a base class. The derived classes inherit features of the base class.

Suppose, the same function is defined in both the derived class and the based class. Now if we call this function using the object of the derived class, the function of the derived class is executed.

This is known as function overriding in C++. The function in derived class overrides the function in base class.
*/

// C++ Function Overriding
// C++ program to demonstrate function overriding

#include <iostream>

using namespace std;

class Base {
    public:
        void print(){
            cout<<"Base Function"<<endl;
        }
};

class Derived:public Base {
    public:
        void print(){
            cout<<"Derived Function"<<endl;
        }
};

int main(){
    Derived derived1;
    derived1.print();

    return 0;
}



