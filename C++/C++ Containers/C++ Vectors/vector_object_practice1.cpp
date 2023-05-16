/*
Write a program to print the name, salary and date of joining of 10 employees in a company. Use array of objects.
*/

#include <iostream>
#include <string>
#include <vector>
#include <limits>

using namespace std;

class Employee {
    private:
        string name, date;
        double salary;
    public:
        Employee(string n, string d, double s): name(n), date(d), salary(s){}

        string getName(){return name;}

        string getDate(){return date;}

        double getSalary(){return salary;}
};


int main(){
    int numEmployees;
    string name, date;
    double salary;

    vector<Employee> employees;

    bool end = false;

    cout<<"Enter the number of Employees' detail you want to enter: ";
    cin>>numEmployees;

    while(cin.fail()){
        cout<<"Invalid number, Please enter a valid integer: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin>>numEmployees;
    }

    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    for(int i = 0; i < numEmployees; i++){
        cout<<"Employee "<<i+1<<endl;
        do{
            cout<<"Enter Full Name: ";
            getline(cin, name);
        } while(name.empty());

        cout<<"Enter Salary: ";
        cin>>salary;
        
        while(cin.fail()){
            cout<<"Invalid number, please enter a valid number: ";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }

        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        do{
            cout<<"Enter Date of joining(Day/Month/Year): ";
            getline(cin, date);
        } while(date.empty());
        
        Employee employ(name, date, salary);
        employees.push_back(employ);
    }

    cout<<"\n\tDisplaying Information: \n";

    for(int j = 0; j < employees.size(); j++){
        cout<<"Employee "<<j+1<<endl;
        cout<<"Full Name: "<<employees[j].getName()<<endl;
        cout<<"Salary: "<<employees[j].getSalary()<<endl;
        cout<<"Date Joined: "<<employees[j].getDate()<<endl<<endl;
    }

    cout<<"Information Entered and Displayed Successfully \n"
        <<"Quitting Program...";

    return 0;
}


