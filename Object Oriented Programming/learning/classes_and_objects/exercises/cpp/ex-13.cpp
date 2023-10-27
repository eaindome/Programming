/*
Write a program by creating an 'Employee' class 
having the following functions and print the final salary.
1 - 'getInfo()' which takes the salary, number of hours of work per day of employee as parameters
2 - 'AddSal()' which adds $10 to the salary of the employee if it is less than $500.
3 - 'AddWork()' which adds $5 to the salary of the employee if the number of hours of work per day is more than 6 hours.
*/
#include <iostream>
#include <string>
using namespace std;

// define class
class Employee {
    private:
        double salary, num_hours;

    public:
        Employee(double sal, double num):
        salary(sal), num_hours(num) {}

        void getInfo(double sal, double num) {
            salary = sal;
            num_hours = num;
        }

        void AddSal() {
            if (salary < 500) {
                salary += 10;
            }
        }

        void AddWork() {
            if (num_hours > 6) {
                salary += 5;
            }
        }

        double getSalary() {
            return salary;
        }
};

int main() {
    // create object of class
    Employee emp(0, 0);
    
    // initialize variables
    double initialSalary, hoursWork;

    // take input from user
    cout<<"Enter Salary: ";
    cin>>initialSalary;
    cout<<"Enter Number of working hours: ";
    cin>>hoursWork;

    // input initial info
    emp.getInfo(initialSalary, hoursWork);

    // add salary and then add add work
    emp.AddSal();
    emp.AddWork();

    // display finaly salary
    cout<<"Final salary: $"<<emp.getSalary()<<endl;

    return 0;
}