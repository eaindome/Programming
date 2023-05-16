// C++ Call Overridden Funciton From Derived Class
// C++ program to call the overriden function from a member function fo the derived class

#include <iostream>

using namespace std;

class Base {
    public:
        void print() {
            cout<<"Base Function"<<endl;
        }
};

class Derived : public Base {
    public:
        void print() {
            cout<<"Derived Function"<<endl;

            // call overridden function
            Base::print();
        }
};

int main() {
    Derived derived1;
    derived1.print();
    
    return 0;
}








