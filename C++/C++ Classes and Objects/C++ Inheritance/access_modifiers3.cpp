/*
protected Access Modifier:
The 'protected' keyword is used to create protected members(data and function).

The protected members can be accessed within the class and from the 
derived class.
*/

// C++ protected Access Specifier
#include <iostream>

using namespace std;

// declare parent class
class Sample {
    // protected elements
    protected:
        int age;
};

// declare child class
class SampleChild:public Sample {
    public:
        void displayAge(int a){
            age = a;
            cout<<"Age = "<<age<<endl;
        }
};

int main() {
    int ageInput;

    // declare object of child class
    SampleChild child;

    cout<<"Enter your age: ";
    cin>>ageInput;

    // call child class function
    // pass ageInput as argument
    child.displayAge(ageInput);

    return 0;
}




