/*
Inheritance:
Inheritance allows us to create a new class(derived class) from 
an existing class(base class).
The derived class inherits the features from the base class and can have additional features
of its own.
    Example:
    class Animal {
        // eat() function
        // sleep() function
    };

    class Dog:public Animal {
        // bark() function
    };

is-a relationship:
Inheritance is an is-a relationship. We use inheritance only if an
is-a relationship is present between the two classes.
Here are some examples:

A car is a vehicle.
Orange is a fruit.
A surgeon is a doctor.
A dog is an animal.
*/

// C++ program to demonstrate inheritance
#include <iostream>
 
using namespace std;

// base class
class Animal {
    public:
        void eat(){
            cout<<"I can eat!"<<endl;
        }

        void sleep(){
            cout<<"I can sleep!"<<endl;
        }
};

// derived class
class Dog:public Animal {
    public:
        void bark(){
            cout<<"I can bark! Woof woof!!"<<endl;
        }
};

int main() {
    // create object of the Dog class
    Dog dog1;

    // calling members of the base class
    dog1.eat();
    dog1.sleep();

    // calling member of the derived class
    dog1.bark();

    return 0;
}







