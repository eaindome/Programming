/*
Write a program to print the name, salary and date of joining of 10 employees in a company. Use array of objects.
*/
#include <iostream>
#include <string>
#include <array>
#include <limits>

using namespace std;

class Employee {
    private:
        string name, date;
        double salary;
    public:
        Employee(string n, string d, double s): name(n), date(d), salary(s){}
        Employee() = default;

        string getName(){return name;}

        string getDate(){return date;}

        double getSalary(){return salary;}
};

int main() {
    array<Employee, 10> employees;          // array of 10 Employee objects

    // loop to get details of each employee
    for(int i = 0; i < 10; i++){
        string name, date;
        double salary;

        cout<<"Enter details for Employee "<<i+1<<endl;
        cout<<"Name: ";
        getline(cin, name);

        cout<<"Salary: ";
        cin>>salary;
        cin.ignore();   // to ignoer the newline character left in the input stream

        cout<<"Date of Joining (dd/mm/yyyy): ";
        getline(cin, date);
        
        employees[i] = Employee(name, date, salary);
    }

    // loop to print details of each employee
    for(int i = 0; i < 10; i++){
        cout<<"Employee "<<i+1<<endl;
        cout<<"Name: "<<employees[i].getName()<<endl;
        cout<<"Salary: "<<employees[i].getSalary()<<endl;
        cout<<"Date of Joining: "<<employees[i].getDate()<<endl<<endl;
    }

    return 0;
}








