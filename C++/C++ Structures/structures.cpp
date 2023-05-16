/*                  C++ Structures
A structure is a collection of variables of different data types under
a single name. It holds a collection of data of different data types.
When a structure is created, no memory is allocated.
When a structure is defined, only then the required memory is allocated
by the compiler. The memory allocated for structure = 58 bytes.

    How to declare a structure in C++ programming:
struct Person{
    char name[50];
    int age;
    float salary;
};

#note: don't forget to end the declaration with a semicolon

    How to declare a structure variable:
"using the example from the declaration"
eg.
    Person bill;

    How to access members of a structure:
The members of structure variable is accessed using a "dot(.)" operator.
eg.
    bill.age = 50;

*/

#include <iostream>

using namespace std;

struct Person{
    char name[50];
    int age;
    float salary;
};


int main(){
    // declare a structure variable
    Person p1;

    // take inputs
    cout<<"Enter Full name: ";
    cin.get(p1.name, 50);

    cout<<"Enter age: ";
    cin>>p1.age;

    cout<<"Enter salary: ";
    cin>>p1.salary;

    cout<<"\n\tDisplaying Information"<<endl;
    cout<<"Name: "<<p1.name<<endl;
    cout<<"Age: "<<p1.age<<endl;
    cout<<"Salary: "<<p1.salary<<endl;


    return 0;
}