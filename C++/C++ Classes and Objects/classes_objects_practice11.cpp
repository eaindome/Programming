/*
Write a program that would print the information (name, year of joining, salary, address) of three employees by creating a class named 'Employee'. The output should be as follows:
Name        Year of joining        Address
Robert        1994        64C- WallsStreat
Sam        2000        68D- WallsStreat
John        1999        26B- WallsStreat
*/

#include <iostream>
#include <vector>

using namespace std;

class Employee {
    private:
        int year;
        double salary;
        string name, address;

    public:
        Employee(int y, double s, string n, string a):year(y),salary(s),name(n),address(a){}

        void display() {
            //cout<<"Name"<<"\t\tYear of joining"<<"\t\tSalary"<<"\t\tAddress"<<endl;
            cout<<name<<"\t\t\t"<<year<<"\t\t\t"<<salary<<"\t\t\t"<<address<<endl;
        }
};


int main(){
    vector<Employee> employee;
    int year, emp_num;
    double salary;
    string name, address;

    cout<<"How many employees info are you adding: ";
    cin>>emp_num;

    for(int i = 0; i < emp_num; i++){
        cout<<endl;
        cout<<"Enter Full Name: ";
        cin.ignore();
        getline(cin, name);
        cout<<"Enter the year of joining: ";
        cin>>year;
        cout<<"Enter employee salary: ";
        cin>>salary;
        cout<<"Enter employee address: ";
        cin.ignore();
        getline(cin, address);

        Employee employ(year, salary, name, address);

        employee.push_back(employ);
    }

    cout<<"Name"<<"\t\tYear of joining"<<"\t\tSalary"<<"\t\tAddress"<<endl;
    for (int j = 0; j < employee.size(); j++){
        employee[j].display();
    }

    return 0;
}



/*
#include <iostream>
#include <string>

using namespace std;

class Employee {
    private:
        string name;
        int yearOfJoining;
        int salary;
        string address;

    public:
        Employee(string n, int y, int s, string a):name(n), yearOfJoining(y), salary(s), address(a){}

        string getName(){
            return name;
        }

        int getYearOfJoining(){
            return yearOfJoining;
        }

        int getSalary(){
            return salary;
        }

        string getAddress(){
            return address;
        }
};

int main() {
    Employee emp1("Robert", 1994, 5000, "64C- WallsStreat");
    Employee emp2("Sam", 2000, 6000, "68D- WallsStreat");
    Employee emp3("John", 1999, 7000, "26B- WallsStreat");

    cout<<"Name\tYear of joining\tSalary\tAddress"<<endl;
    cout<<emp1.getName()<<"\t"<<emp1.getYearOfJoining()<<"\t\t"<<emp1.getSalary()<<"\t"<<emp1.getAddress()<<endl;
    cout<<emp2.getName()<<"\t"<<emp2.getYearOfJoining()<<"\t\t"<<emp2.getSalary()<<"\t"<<emp2.getAddress()<<endl;
    cout<<emp3.getName()<<"\t"<<emp3.getYearOfJoining()<<"\t\t"<<emp3.getSalary()<<"\t"<<emp3.getAddress()<<endl;

    return 0;
}

*/




