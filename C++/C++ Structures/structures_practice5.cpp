/*
Enter the marks of 5 students in Chemistry, Mathematics and Physics (each out of 100) using a structure named Marks having elements roll no., 
name, chem_marks, maths_marks and phy_marks and then display the percentage of each student.
*/

#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Marks {
    string name;
    int roll_no;
    float Chem, Math, Physics;
};

void getData(vector<Marks>&, int);
void displayData(const vector<Marks>&);

int main(){
    // create and inititate variables needed
    int num_students;

    // create a vector of structure variables
    vector<Marks> student;

    cout<<"How many students' marks are you entering: ";
    cin>>num_students;

    // resize vector to hold num_students
    student.resize(num_students);

    getData(student, num_students);

    displayData(student);

    return 0;
}

void getData(vector<Marks>& student, int num_students){
    for(int i = 0; i < num_students; i++){
        cout<<endl<<"\tStudent "<<i+1<<": \n";
        cout<<"Enter the roll number: ";
        cin>>student[i].roll_no;

        // consume the newline character in the input stream
        cin.ignore();

        cout<<"Enter the Full Name: ";
        getline(cin, student[i].name);

        cout<<"\t\tEnter Marks over 100;\n";
        cout<<"Chemistry marks: ";
        cin>>student[i].Chem;

        cout<<"Mathematics marks: ";
        cin>>student[i].Math;

        cout<<"Physics Marks: ";
        cin>>student[i].Physics;
    }
}

void displayData(const vector<Marks>& student){
    cout<<"\t\tDisplaying Student Marks"<<endl;
    for(int j = 0; j < student.size(); j++){
        cout<<endl;
        cout<<"Roll Number: "<<student[j].roll_no<<endl;
        cout<<"Name: "<<student[j].name<<endl;
        cout<<"Chemistry marks: "<<student[j].Chem<<endl;
        cout<<"Maths marks: "<<student[j].Math<<endl;
        cout<<"Physics marks: "<<student[j].Physics<<endl;

        float total_marks = student[j].Chem + student[j].Physics + student[j].Physics;
        float percentage = total_marks / 3.0;

        cout<<"Percentage: "<<percentage<<"%"<<endl;
    }
}






/*
A different Solution
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Marks {
    string name;
    int roll_no;
    float Chem, Math, Physics;
};

void getData(vector<Marks>&, int);
void displayData(const vector<Marks>&);

int main(){
    // create and inititate variables needed
    int num_students;

    // create a vector of structure variables
    vector<Marks> students;

    cout<<"How many students' marks are you entering: ";
    cin>>num_students;

    // resize vector to hold num_students
    students.resize(num_students);

    getData(students, num_students);

    displayData(students);

    return 0;
}

void getData(vector<Marks>& students, int num_students){
    for(int i = 0; i < num_students; i++){
        cout<<endl<<"\tStudent "<<i+1<<": "<<endl;
        cout<<"Enter the roll number: ";
        cin>>students[i].roll_no;

        // consume the newline character in the input stream
        cin.ignore();

        cout<<"Enter the Full Name: ";
        getline(cin, students[i].name);

        cout<<"Enter Marks over 100:"<<endl;
        cout<<"Chemistry marks: ";
        cin>>students[i].Chem;

        cout<<"Mathematics marks: ";
        cin>>students[i].Math;

        cout<<"Physics Marks: ";
        cin>>students[i].Physics;
    }
}

void displayData(const vector<Marks>& students){
    cout<<"\t\tDisplaying Student Marks"<<endl;
    for(int j = 0; j < students.size(); j++){
        float total_marks = students[j].Chem + students[j].Math + students[j].Physics;
        float percentage = total_marks / 3.0;

        cout<<"Roll Number: "<<students[j].roll_no<<endl;
        cout<<"Name: "<<students[j].name<<endl;
        cout<<"Chemistry marks: "<<students[j].Chem<<endl;
        cout<<"Maths marks: "<<students[j].Math<<endl;
        cout<<"Physics marks: "<<students[j].Physics<<endl;
        cout<<"Percentage: "<<percentage<<"%"<<endl;
    }
}

*/





