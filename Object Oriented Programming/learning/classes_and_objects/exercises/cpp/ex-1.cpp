/*
Create a class named 'Student' with a string variable 'name' and an integer variable 'roll_no'. 
Assign the value of roll_no as '2' and that of name as "John" by creating an object of the class Student.
*/
#include <iostream>
using namespace std;

// define class
class Student {
    public:
        string name;
        int roll_no;
};

int main() {
    // create an object of the student class
    Student std1;

    // assign values
    std1.name = "John";
    std1.roll_no = 2;

    // display values
    cout<<"Name: "<<std1.name<<endl;
    cout<<"Roll No: "<<std1.roll_no<<endl;
}