/*
Create a class named 'Member' having the following members:
Data members
1 - Name
2 - Age
3 - Phone number
4 - Address
It also has a function named 'printSalary' which prints the salary of the members.
Two classes 'Employee' and 'Manager' inherits the 'Member' class. The 'Employee' and 'Manager' classes have data members 'specialization' and 'department' respectively. Now, assign name, age, phone number, address and salary to an employee and a manager by making an object of both of these classes and print the same.
*/

#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Member {
    protected:
        int age;
        unsigned long int phoneNum;
        string name, address;
        double salary;
    public:
        Member(int a, unsigned long int pN, string n, string ad): age(a), phoneNum(pN), name(n), address(ad){}

        int getAge(){return age;}
        unsigned long int getPhoneNum(){return phoneNum;}

        string getName(){return name;}
        string getAddress(){return address;}

        void setSalary(double s){
            salary = s;
        }

        double getSalary(){return salary;}

        void printSalary(double salary){
            cout<<"Salary: "<<getSalary()<<endl;
        }
};

class Manager: public Member {
    private:
        string specialization, department;
    public:
        Manager(int a, unsigned long int pN, string n, string ad): Member(a, pN, n, ad){}
        void setSpecialization(string sp){
            specialization = sp;
        }

        void setDepartment(string dep){
            department = dep;
        }

        string getSpecialization(){return specialization;}
        string getDepartment(){return department;}
};

class Employee: public Member {
    private:
        string specialization, department;
    public:
        Employee(int a, unsigned long int pN, string n, string ad): Member(a, pN, n, ad){}
        void setSpecialization(string sp){
            specialization = sp;
        }

        void setDepartment(string dep){
            department = dep;
        }

        string getSpecialization(){return specialization;}
        string getDepartment(){return department;}
};


int main(){
    char again;
    double salary;
    unsigned long int phoneNum;
    int age, numMembers, choice;
    string name, address, specialization, department;

    bool end = false;

    vector<Manager> man;
    vector<Employee> emp;

    cout<<"How many company members do you want to enter: ";
    cin>>numMembers;
    cin.ignore();

    do{
        cout<<"Which company member do you want to add to: \n"
            <<"1. Manager \n"<<"2. Employee \n"<<"Enter 1 or 2: ";
        cin>>choice;

        switch(choice){
            case 1: {
                cout<<"\nManager Information\n";
                cout<<"Enter name: ";
                cin.ignore();
                getline(cin, name);
                cout<<"Enter age: ";
                cin>>age;
                cout<<"Enter phone number: ";
                cin>>phoneNum;
                cout<<"Enter Address: ";
                getline(cin, address);
                cout<<"Enter Specialization: ";
                getline(cin, specialization);
                cout<<"Enter Department: ";
                cin>>department;
                cout<<"Enter Salary: ";
                cin>>salary;

                Manager manage(age, phoneNum, name, address);
                
                manage.setSalary(salary);
                manage.setSpecialization(specialization);
                manage.setDepartment(department);

                man.push_back(manage);
                break;
            }

            case 2: {
                cout<<"\nEmployee Information\n";
                cout<<"Enter name: ";
                getline(cin, name);
                cout<<"Enter age: ";
                cin>>age;
                cout<<"Enter phone number: ";
                cin>>phoneNum;
                cout<<"Enter Address: ";
                cin.ignore();
                getline(cin, address);
                cout<<"Enter Specialization: ";
                cin.ignore();
                getline(cin, specialization);
                cout<<"Enter Department: ";
                cin>>department;
                cout<<"Enter Salary: ";
                cin>>salary;

                Employee employ(age, phoneNum, name, address);
                
                employ.setSalary(salary);
                employ.setSpecialization(specialization);
                employ.setDepartment(department);

                emp.push_back(employ);
                break;
            }

            default:
                cout<<"Invalid Option!";
                break;
        }

        cout<<"Do you want to enter another information: (y/n)\n";
        cin>>again;
        if(again == 'n')
            end = true;
    } while(end != true);

    cout<<"\tDisplaying Company Information\n";
    cout<<"Which information do you want to display: \n"
        <<"1. Manager \n"<<"2. Employee \n"<<"Enter 1 or 2: ";
    cin>>choice;

    switch(choice){
        case 1: {
            cout<<"\nManagers' Information\n";
            for(int i = 0; i < man.size(); i++){
                cout<<"Manager "<<i+1<<": ";
                cout<<"Name: "<<man[i].getName()<<endl;
                cout<<"Age: "<<man[i].getAge()<<endl;
                cout<<"Phone Number: "<<man[i].getAge()<<endl;
                cout<<"Address: "<<man[i].getAge()<<endl;
                cout<<"Specialization: "<<man[i].getAge()<<endl;
                cout<<"Department: "<<man[i].getAge()<<endl;
                cout<<"Salary: "<<man[i].getAge()<<endl<<endl;
            }
            break;
        }
        case 2: {
            cout<<"\nManagers' Information\n";
            for(int i = 0; i < emp.size(); i++){
                cout<<"Employee "<<i+1<<": ";
                cout<<"Name: "<<emp[i].getName()<<endl;
                cout<<"Age: "<<emp[i].getAge()<<endl;
                cout<<"Phone Number: "<<emp[i].getAge()<<endl;
                cout<<"Address: "<<emp[i].getAge()<<endl;
                cout<<"Specialization: "<<emp[i].getAge()<<endl;
                cout<<"Department: "<<emp[i].getAge()<<endl;
                cout<<"Salary: "<<emp[i].getAge()<<endl<<endl;
            }
            break;
        }
        default:
            cout<<"Invalid Option!";
            break;
    }

    return 0;
}








