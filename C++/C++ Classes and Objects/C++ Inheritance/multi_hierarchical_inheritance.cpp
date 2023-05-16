/*
If more than one class is inherited from the base class, it's known as hierarchical inheritance. In hierarchical inheritance, all features that are common in child classes are included in the base class.

For example, Physics, Chemistry, Biology are derived from Science class. Similarly, Dog, Cat, Horse are derived from Animal class.
    Syntax:
        class base_class {
            // code
        };
        
        class first_derived_class: public base_class {
            // code
        };

        class second_derived_class: public base_class {
            // code
        };

        class third_derived_class: public base_class {

        };
*/

// C++ program to demonstrate hierarchical inheritance

#include <iostream>

using namespace std;

// base class
class Animal {
    public:
        void info() {
            cout<<"I am an animal."<<endl;
        } 
};

// derived class 1
class Dog: public Animal {
    public:
        void bark() {
            cout<<"I am a Dog. Woof woof."<<endl;
        }
};

// derived class 2 
class Cat: public Animal {
    public:
        void meow() {
            cout<<"I am a Cat. Meow."<<endl;
        }
};

int main() {
    // create object of Dog class
    Dog dog1;
    cout<<"Dog Class: "<<endl;
    dog1.info();                    // Parent Class function
    dog1.bark();                    // Derived Class function

    Cat cat1;
    cout<<"Cat Class: "<<endl;
    cat1.info();                    // Parent Class Function
    cat1.meow();                    // Derived Class Function

    return 0;
}


