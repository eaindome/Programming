/*
Write a program to store the roll no. (starting from 1), 
name and age of 5 students and then print the details of the student with roll no. 2.
*/

#include <iostream>
#include <string>
#include <vector>

using namespace std;

// structure declaration
struct Student {
    string name;
    int age, roll_no;
};

// function declaration
void getData(vector<Student>&, int);


int main(){
    // create and initialize variables
    int num_students;

    // create a vector of structure variables
    vector<Student> s;

    // ask user for inputs
    cout<<"How many student information do you want to enter: ";
    cin>>num_students;

    // resize the vector to hold the number of students entered
    s.resize(num_students);

    // get data for students
    getData(s, num_students);

    cout<<endl<<"\t\tDetails for student in roll 2: \n"
        <<"Name: "<<s[1].name<<"\n"
        <<"Age: "<<s[1].age<<"\n"
        <<"Roll Number: "<<s[1].roll_no;

    return 0;
}

// function definition
void getData(vector<Student>& s, int num_students){
    for(int i = 0; i<num_students; i++){
        cout<<endl;
        // ask user for inputs
        cout<<"Enter roll number of student "<<i+1<<": ";
        cin>>s[i].roll_no;

        // consume newline character in the input stream
        cin.ignore();

        cout<<"Enter full name of student "<<i+1<<": ";
        getline(cin, s[i].name);

        cout<<"Enter age of student "<<i+1<<": ";
        cin>>s[i].age;
    }
}







