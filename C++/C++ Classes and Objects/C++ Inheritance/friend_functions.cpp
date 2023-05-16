/*
// friend Functions in C++
A friend function can access the private and protected data of a class.
We declare a friend function using the 'friend' keyword inside the body 
of the class.
    Syntax:
        class className {
            // code
            friend returnType functionName(arguments);
            // code
        };
*/

// Working of friend Function
// C++ program to demonstrate the working  of friend function

#include <iostream>

using namespace std;

class Distance {
    private:
        int meter;

        // friend function
        friend int addFive(Distance);
        
    public:
        Distance(): meter(0) {}
};

// friend function definition
int addFive(Distance d) {

    // accessing private members from the friend function
    d.meter =+ 5;

    return d.meter;
}

int main() {
    Distance D;
    cout<<"Distance: "<<addFive(D);

    return 0;
}





