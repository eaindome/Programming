/*
We learnt the 'public' access modifier, next up, 'private' access modifier
private Access Modifier:
The 'private' keyword is used to create private members(data and functions).
The 'private' members can only be accessed from within the class
Friend classes and friend functions can access private members.
*/
#include <iostream>

using namespace std;

// class definition
class Sample {
    // private elements
    private:
        int age;
    
    // public elements
    public:
        void displayAge(int a){
            age = a;
            cout<<"Age = "<<age<<endl;
        }
};


int main(){
    int ageInput;

    // delcare an object
    Sample obj1;

    // ask for user input
    cout<<"Enter your age: ";
    cin>>ageInput;

    // call function and pass ageInput as argument
    obj1.displayAge(ageInput);

    return 0;
}


