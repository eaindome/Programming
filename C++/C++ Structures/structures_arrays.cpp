#include <iostream>
#include <string>

using namespace std;

// structure declaration
struct Student {
    string name;
    int roll_no, age;
    double marks;
};

// function declaration
void getData(Student[], int);
void displayData(Student[], int);

int main(){
    // create and initialize variables
    char choice;
    int num_students;

    const int max_Students = 10;            // Maximum number of students

    // create an array of structure variables
    Student student[max_Students];

    cout<<"How many students do you want to enter information for? ";
    cin>>num_students;

    // validate the number of students entered
    if(num_students > max_Students){
        cout<<"Error: Maximum number of students exceeded."<<endl;
        return 0;
    }

    // Get the data for the students
    getData(student, num_students);

    cout<<endl<<"Do you want to display Student Information? \n"
        <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
    cin>>choice;

    if(choice == '1'){
        displayData(student, num_students);
    }
    

    return 0;
}

// function definition
void getData(Student student[], int num_students){
    for(int i=0; i<num_students;i++){
        cout<<endl;
        // ask user for inputs
        cout<<"Enter roll number for student "<<i+1<<": ";
        cin>>student[i].roll_no;

        // consume the newline character left in the input stream        
        cin.ignore();

        cout<<"Enter Full Name for student "<<i+1<<": ";
        getline(cin, student[i].name);

        cout<<"Enter age for student "<<i+1<<": ";
        cin>>student[i].age;

        cout<<"Enter marks for student "<<i+1<<": ";
        cin>>student[i].marks;

    }
}

void displayData(Student student[], int num_students){
    cout<<endl<<"\t\tDisplaying Student Information"<<endl;
    for(int j=0; j<num_students; j++){
        cout<<endl;
        cout<<"Student "<<j+1<<endl;
        cout<<"Roll Number: "<<student[j].roll_no<<endl;
        cout<<"Name: "<<student[j].name<<endl;
        cout<<"Age: "<<student[j].age<<endl;
        cout<<"Marks: "<<student[j].marks<<endl;
    }
}




