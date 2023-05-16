#include <iostream>
#include <string>
#include <vector>

using namespace std;

// structure declaration
struct Student {
    string name;
    int age, roll_no;
    double marks;
};

// function declaration
void getData(vector<Student>&, int);
void displayData(const vector<Student>&);

int main(){
    // create and initialize variables
    char choice;
    int num_students;

    // create a vector of structure variables
    vector<Student> student;

    // ask user for input
    cout<<"How many student information do you want to enter: ";
    cin>>num_students;

    // resize the vector to hold the number of students entered
    student.resize(num_students);

    // get data for student
    getData(student, num_students);

    cout<<endl<<"Do you want to display information: \n"
        <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
    cin>>choice;

    if(choice == '1'){
        displayData(student);
    }

    return 0;
}

// function definitions
void getData(vector<Student>& student, int num_students){
    for(int i = 0; i<num_students; i++){
        cout<<endl;
        // ask for user input
        cout<<"Enter roll number for student "<<i+1<<": ";
        cin>>student[i].roll_no;

        // consume newline character in the input stream
        cin.ignore();

        cout<<"Enter the Full Name of student "<<i+1<<": ";
        getline(cin, student[i].name);

        cout<<"Enter the age of  student "<<i+1<<": ";
        cin>>student[i].age;

        cout<<"Enter the marks of student "<<i+1<<": ";
        cin>>student[i].marks;
    }
}

void displayData(const vector<Student>& student){
    cout<<endl<<"\t\tDisplaying Student Information"<<endl;
    for(int j = 0; j<student.size(); j++){
        cout<<"\tStudent "<<j+1<<endl;
        cout<<"Name: "<<student[j].name<<endl;
        cout<<"Age: "<<student[j].age<<endl;
        cout<<"Roll Number: "<<student[j].roll_no<<endl;
        cout<<"Marks: "<<student[j].marks<<endl;
    }
}



