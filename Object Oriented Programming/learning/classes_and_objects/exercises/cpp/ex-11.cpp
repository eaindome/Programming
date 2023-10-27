/*
Write a program that would print the information 
(name, year of joining, salary, address) of three employees 
by creating a class named 'Employee'. The output should be as follows:
Name        Year of joining        Address
Robert        1994        64C- WallsStreat
Sam        2000        68D- WallsStreat
John        1999        26B- WallsStreat
*/
#include <iostream>
#include <string>
using namespace std;

// define class
class Employee {
    private:
        string name, year, address;

    public:
        Employee(string nme, string yr, string add):
        name(nme), year(yr), address(add) {}

        string returnName() { return name; }
        string returnYear() { return year; }
        string returnAdress() { return address; }
};

int main() {
    // create objects of class andinitialize
    Employee empl1("Robert", "1994", "64C-WallsStreat");
    Employee empl2("Sam", "2000", "68D-WallsStreat");
    Employee empl3("John", "1999", "26B-WallsStreat");

    // display results
    cout<<"Name    "<<"Year of joining    "<<"Adress "<<endl;
    cout<<empl1.returnName()<<"    "<<empl1.returnYear()<<"             "<<empl1.returnAdress()<<endl;
    cout<<empl2.returnName()<<"       "<<empl2.returnYear()<<"             "<<empl2.returnAdress()<<endl;
    cout<<empl3.returnName()<<"      "<<empl3.returnYear()<<"             "<<empl3.returnAdress()<<endl;

    return 0;
}