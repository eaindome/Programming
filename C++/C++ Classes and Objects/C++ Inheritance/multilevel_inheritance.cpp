/*
Inheritance is one of the core feature of an object-oriented programming language. It allows software developers to derive a new class from the existing class. The derived class inherits the features of the base class (existing class).

There are various models of inheritance in C++ programming.

// C++ Multilevel Inheritance
In C++ programming, not only you can derive a class from the base class but 
you can also derive a class from the derived class. 
This form of inheritance is known as multilevel inheritance.
    Syntax:
        class A {
            // code
        };
        class B: public A {
            // code
        };
        class C: public B {
            // code
        };

Here, class B is derived from the base class A and the class C is derived from the derived class B.
*/

// C++ Multilevel Inheritance

#include <iostream>

using namespace std;

class A {
    public:
        void display() {
            cout<<"Base class content.";
        }
};

class B: public A {};

class C: public B {};


int main() {
    C obj;
    obj.display();

    return 0;
}









