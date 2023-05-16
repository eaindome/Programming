// Passing structure to functions

#include <iostream>

using namespace std;

// create a structure
struct Person {
    char name[50];
    int age;
    float salary;
};

// function declarations
Person getData(Person);
void displayData(Person);

int main(){
    // create structure variables
    Person p, temp;

    temp = getData(p);      // this is can be used
    p = temp;               // p = getData(p)

    displayData(p);

    return 0;
}

// function definitions
Person getData(Person p){                   // function of type 'Structure'
    // ask user for input
    cout<<"Enter Full Name: ";
    cin.get(p.name, 50);

    cout<<"Enter age: ";
    cin>>p.age;

    cout<<"Enter salary: ";
    cin>>p.salary;

    return p;
}

void displayData(Person p){
    cout<<"\t\tDisplaying Information"<<endl;
    cout<<"Name: "<<p.name<<endl;
    cout<<"Age: "<<p.age<<endl;
    cout<<"Salary: "<<p.age<<endl;
}
