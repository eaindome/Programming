/*
Access Overridden Function in C++
To access the overridden function of the base class, we use the scope resolution operator ::.

We can also access the overridden function by using a pointer of the base class to point to an object of the derived class and then calling the function from that pointer.
*/

// C++ Access Overidden Function to the Base class
// C++ program to access overridden function in main() using 
// the scope resolution operator ::

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
    Derived derived1, derived2;
    derived1.print();

    // access print() function of the Base class
    derived2.Base::print();

    return 0;
}



