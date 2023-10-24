/* Access Modifier
private Access Modifier
    - the "private" keyword is used to create private members (data and function)
    - the private members can only be accessed from within the class
    - friend classes and friend functions can access private members
*/

// C++ private Access Specifier
#include <iostream>
using namespace std;

// define a class
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

int main() {
    // variable to store age
    int ageInput;

    // declare an object
    Sample age1;

    // take input
    cout<<"Enter your age: ";
    
    // store input value
    cin>>ageInput;

    // call function and pass ageInput as argument
    age1.displayAge(ageInput);

    return 0;
}
