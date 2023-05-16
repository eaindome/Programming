// Passing Structure to function in C++.

#include <iostream>

using namespace std;

// declare a structure
struct Person {
    char name[50];
    int age;
    float salary;
};

// function declaration
void displayData(Person);

int main(){
    // declare a structure variable
    Person p;

    // ask user for inputs
    cout<<"Enter Full Name: ";
    cin.get(p.name, 50);

    cout<<"Enter age: ";
    cin>>p.age;

    cout<<"Enter salary: ";
    cin>>p.salary;

    // Function call with structure variable as an argument
    displayData(p);

    return 0;
}

// function displahy
void displayData(Person p){
    cout<<"\t\tDisplaying Information"<<endl;
    cout<<"Name: "<<p.name<<endl;
    cout<<"Age: "<<p.age<<endl;
    cout<<"Salary: "<<p.salary<<endl;
}







