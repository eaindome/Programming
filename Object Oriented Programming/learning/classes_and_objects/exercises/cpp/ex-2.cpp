/*
Assign and print the roll number, phone number and address of two students 
having names "Sam" and "John" respectively by creating two objects of the class 'Student'.
*/

#include <iostream>
#include <string>
using namespace std;

// create class
class Student {
    public:
        int roll_no;
        string name, address, phone_number;

    // constructor to initialize objects
    Student(string n, string a, string p, int r) {
        name = n;
        address = a;
        phone_number = p;
        roll_no = r;
    }
};

int main() {
    // create objects of class
    Student std1(
        "Sam", "AC204", "0243988529", 2
    );

    Student std2(
        "John", "AC205", "0544148216", 3
    );

    // Print student information
    cout << "Student 1:\n";
    cout << "Name: " << std1.name << endl;
    cout << "Roll No: " << std1.roll_no << endl;
    cout << "Address: " << std1.address << endl;
    cout << "Phone Number: " << std1.phone_number << endl;

    cout << "\nStudent 2:\n";
    cout << "Name: " << std2.name << endl;
    cout << "Roll No: " << std2.roll_no << endl;
    cout << "Address: " << std2.address << endl;
    cout << "Phone Number: " << std2.phone_number << endl;

    return 0;
}