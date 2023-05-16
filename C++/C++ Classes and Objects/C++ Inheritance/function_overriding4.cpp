// C++ Call Overridden Function Using Pointer
// C++ program to access overridden function using pointer of Base type that points
// to an object of Derived class

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


int main() {
    Derived object;

    // pointer of Base type that points to object
    Base* ptr = &object;

    // call function of Base class using ptr
    ptr->print();

    return 0;
}



