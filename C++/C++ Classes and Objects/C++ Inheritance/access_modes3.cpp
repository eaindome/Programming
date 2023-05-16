/*
// private inheritance in C++
private inheritance has the following features
    - makes the 'public' and 'protected' members of the base class
    'PRIVATE' in the derived class.

    NB:
        'private' members of the base class are inaccessible to the 
        derived class
*/

// C++ private Inheritance
// C++ program to demonstrate the working of private inheritance

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
        int getPVT() {
            return pvt;
        }
};

class PrivateDerived:private Base {
    public:
        // function to access protected member
        int getProt(){
            return prot;
        }

        // function to access private member
        int getPub(){
            return pub;
        }
};


int main() {
    PrivateDerived object1;
    cout<<"Private cannot be accessed."<<endl;
    cout<<"Protected = "<<object1.getProt()<<endl;
    cout<<"Public = "<<object1.getPub()<<endl;

    cout<<endl; 
    
    Base object;
    cout<<"Private = "<<object.getPVT()<<endl;
    cout<<"Public = "<<object.pub<<endl;

    return 0;
}




