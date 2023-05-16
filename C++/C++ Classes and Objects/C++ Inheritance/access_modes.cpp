/*
In C++ inheritance, we can derive a child class from the base class
in different access modes.
    Example:
        class Base {
            // code
        };

        class Derived:public Base {
            // code
        };
The 'public' keyword means that we have created a derived class from 
the base class in public mode. Alternatively, we can also derive classes 
in protected or private modes.

// public inheritance in c++
public inheritance has the following features:
    - makes 'public' members of the base class public in the derived class, 
    and the 'protected' members of the base class remain protected in the derived class.
*/

// C++ public Inheritance
// C++ program to demonstrate the working of public inheritance

#include <iostream>

using namespace std;

class Base {
    private:
        int pvt = 1;

    protected:
        int prot = 2;
    
    public:
        int pub = 3;

        // function to access private member
        int getPVT(){
            return pvt;
        }
};

class PublicDerived : public Base {
    public:
        // function to access protected member from Base
        int getProt(){
            return prot;
        }
};

int main(){
    PublicDerived object1;
    cout<<"Private = "<<object1.getPVT()<<endl;
    cout<<"Protected = "<<object1.getProt()<<endl;
    cout<<"Public = "<<object1.pub<<endl;

    return 0;
}







