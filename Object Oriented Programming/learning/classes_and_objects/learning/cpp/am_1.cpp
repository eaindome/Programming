/* Access Modifiers
public Access Modifier
    - the "public" keyword is used to create public members
    - the public members are accessible from any part of the program
*/

// C++ public access modifier
#include <iostream>
using namespace std;

// define a class
class Sample {
    // public elements
    public:
        int age;

        void displayAge() {
            cout<<"Age = "<<age<<endl;
        }
};

int main(){
    // declare a class object
    Sample obj1;

    // take input
    cout<<"Enter your age: ";

    // store input in age of the obj1 object
    cin>>obj1.age;

    // call class function
    obj1.displayAge();

    return 0;
}