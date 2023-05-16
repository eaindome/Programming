/*
The acess modifiers of C++ are public, private and protected.
One of the main features of object-oriented programming languages such as C++ is data hiding.

Data hiding refers to restricting access to data members of a class. This is to prevent other functions and classes from tampering with the class data.

However, it is also important to make some member functions and member data accessible so that the hidden data can be manipulated indirectly.

The access modifiers of C++ allows us to determine which class members are accessible to other classes and functions, and which are not.

// public Acess Modifier:
The 'public' keyword is used to create public members(data and functions)
The public members are accessible from any part of the program.
*/

#include <iostream>

using namespace std;

// define a class
class Sample {
    // public elements
    public:
        int age;

        void displayAge(){
            cout<<"Age = "<<age<<endl;
        }
};

int main(){
    // declare a class object
    Sample obj1;

    cout<<"Enter your age: ";

    // store input in age of the obj1 object
    cin>>obj1.age;

    // call class function
    obj1.displayAge();

    return 0;
}



