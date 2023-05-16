/*
Write a program to store and print the roll no., name, age, address and marks of 15 students using structure.
*/
#include <iostream>
#include <string>
#include <vector>

using namespace std;

// structure declaration
struct Student {
    string name;
    int age, roll_no, address;
    double marks;
};

// function declaration
void getData(vector<Student>&, int);
void displayData(const vector<Student>&);

int main(){
    // create and initiate variables
    char choice;
    int num_students;

    // create a vector of structure variables
    vector<Student> student;

    // ask for user input
    cout<<"How many student information do you want to enter: ";
    cin>>num_students;

    // resize the vector to take in num_students
    student.resize(num_students);

    // get student data 
    getData(student, num_students);

    cout<<endl<<"Do you want to display student Information? \n"
        <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
    cin>>choice;
    if (choice == '1'){
        displayData(student);
    }
    return 0;
}

// function definition
void getData(vector<Student>& student, int num_students){
    for(int i = 0; i < num_students; i++){
        cout<<endl;

        // ask user for input
        cout<<"Enter roll number of student "<<i+1<<": ";
        cin>>student[i].roll_no;

        // consume newline character 
        cin.ignore();

        cout<<"Enter Full Name of student "<<i+1<<": ";
        getline(cin, student[i].name);

        cout<<"Enter age of student "<<i+1<<": ";
        cin>>student[i].age;

        cout<<"Enter address of student "<<i+1<<": ";
        cin>>student[i].address;

        cout<<"Enter marks of student "<<i+1<<": ";
        cin>>student[i].marks;
    }
}

void displayData(const vector<Student>& student){
    cout<<"\n\t\tDisplaying Student Information"<<endl;
    for(int j = 0; j < student.size(); j++){
        cout<<"\tStudent "<<j+1<<endl;
        cout<<"Roll Number: "<<student[j].roll_no<<endl;
        cout<<"Name: "<<student[j].name<<endl;
        cout<<"Age: "<<student[j].age<<endl;
        cout<<"Address: "<<student[j].address<<endl;
        cout<<"Marks: "<<student[j].marks<<endl<<endl;
    }
}
















