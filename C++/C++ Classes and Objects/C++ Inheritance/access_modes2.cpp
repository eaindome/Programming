/*
// protected inheritance in c++:
protected inheritance has the following features
    - makes the 'public' and 'protected' members of the base
    class 'PROTECTED' in the derived class
*/

// C++ protected Inheritance
// C++ program to demonstrate the working of protected inheritance

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

class ProtectedDerived:protected Base {
    public:
        // function to access protected member
        int getProt() {
            return prot;
        }

        // function to access public member from Base
        int getPub() {
            return pub;
        }

        int getPvt() {
            return getPvt();
        }
};

int main() {
    ProtectedDerived object1;
    cout<<"Private cannot be accessed."<<endl;
    cout<<"Protected = "<<object1.getProt()<<endl;
    cout<<"Public = "<<object1.getPub()<<endl;

    return 0;
}





