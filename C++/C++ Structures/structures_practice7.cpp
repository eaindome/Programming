/*
Write a structure to store the roll no., name, age (between 11 to 14) and address of students (more than 10). Store the information of the students.
1 - Write a function to print the names of all the students having age 14.
2 - Write another function to print the names of all the students having even roll no.
3 - Write another function to display the details of the student whose roll no is given (i.e. roll no. entered by the user).
*/

#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Student {
    string name, address;
    int roll_no, age;
};

// function declarations
void getData(vector<Student>&, int);
void displayAge14(const vector<Student>&);
void displayEvenRoll(const vector<Student>&);
void displayRollNo(const vector<Student>&);

int main(){
    // create and initiate variables needed
    int num_students;

    // create and initiate structure variables
    vector<Student> student;

    // ask user for input
    cout<<"How many student information do you want to enter: ";
    cin>>num_students;

    // resize vector to num_students
    student.resize(num_students);

    getData(student, num_students);
    displayAge14(student);
    displayEvenRoll(student);
    displayRollNo(student);

    return 0;
}

// function definitions
void getData(vector<Student>& student, int num_students){
    for(int i = 0; i<num_students; i++){
        cout<<endl<<"\tStudent "<<i+1<<endl;

        // ask user for input
        cout<<"Roll Number: ";
        cin>>student[i].roll_no;

        // consume newline character in the input stream
        cin.ignore();
        cout<<"Full Name: ";
        getline(cin, student[i].name);

        cout<<"Age: ";
        cin>>student[i].age;

        // consume newline character in the input stream
        cin.ignore();
        cout<<"Address: ";
        getline(cin, student[i].address);
    }
}

void displayAge14(const vector<Student>& student){
    cout<<endl<<"\t\tNames of Students at age 14"<<endl;
    for(int j = 0; j < student.size(); j++){
        if (student[j].age == 14){
            cout<<"Student "<<j+1<<": "<<student[j].name<<endl;
        }
    }
}

void displayEvenRoll(const vector<Student>& student){
    cout<<endl<<"\t\tNames of Student with even Roll Number"<<endl;
    for(int k = 0; k < student.size(); k++){
        if(student[k].roll_no % 2 == 0){
            cout<<"Student "<<k+1<<": "<<student[k].name<<endl;
        }
    }
}

/*
void displayRollNo(const vector<Student>& student){
    cout<<endl<<"\t\tNames of Students with Roll Number"<<endl;
    for(int l = 0; l < student.size(); l++){
        if(student[l].roll_no){
            cout<<"Student "<<l+1<<": "<<student[l].name<<endl;
        }
    }
}*/

void displayRollNo(const vector<Student>& student){
    int num;
    cout<<endl<<"\t\tDetails of Students in Roll Number"<<endl;
    cout<<"Enter the roll number details you want to check: ";
    cin>>num;
    cout<<"Students in Roll Number "<<num<<" are: \n";
    for(int l = 0; l < student.size(); l++){
        if(student[l].roll_no == num){
            cout<<"\tStudent "<<l+1<<endl;
            cout<<"Student "<<l+1<<" name: "<<student[l].name<<endl;
            cout<<"Student "<<l+1<<" age: "<<student[l].age<<endl;
            cout<<"Student "<<l+1<<" address: "<<student[l].address<<endl<<endl;
        }
    }
}



// A Different Solution
/*
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Student {
    int roll_no, age;
    string name, address;
};

// function declarations
void getData(vector<Student>&);
void displayAge14(const vector<Student>&);
void displayEvenRoll(const vector<Student>&);
void displayRollNo(const vector<Student>&);

int main(){
    // create and initiate structure variables
    vector<Student> student;

    getData(student);

    displayAge14(student);
    displayEvenRoll(student);
    displayRollNo(student);

    return 0;
}

// function definitions
void getData(vector<Student>& student){
    int num_students;
    cout<<"Enter the number of students: ";
    cin>>num_students;

    // check if num_students is greater than 10
    if(num_students < 10){
        cout<<"Minimum 10 students are required.";
        return;
    }

    for(int i = 0; i<num_students; i++){
        cout<<endl<<"\tStudent "<<i+1<<endl;

        // ask user for input
        cout<<"Roll Number: ";
        cin>>student[i].roll_no;

        // consume newline character in the input stream
        cin.ignore();
        cout<<"Full Name: ";
        getline(cin, student[i].name);

        cout<<"Age (between 11 to 14): ";
        cin>>student[i].age;

        // check if age is between 11 to 14
        if(student[i].age < 11 || student[i].age > 14){
            cout<<"Age should be between 11 to 14.";
            return;
        }

        // consume newline character in the input stream
        cin.ignore();
        cout<<"Address: ";
        getline(cin, student[i].address);
    }
}

void displayAge14(const vector<Student>& student){
    cout<<endl<<"\t\tNames of Students at age 14"<<endl;
    for(int j = 0; j < student.size(); j++){
        if (student[j].age == 14){
            cout<<"Student "<<j+1<<": "<<student[j].name<<endl;
        }
    }
}

void displayEvenRoll(const vector<Student>& student){
    cout<<endl<<"\t\tNames of Student with even Roll Number"<<endl;
    for(int k = 0; k < student.size(); k++){
        if(student[k].roll_no % 2 == 0){
            cout<<"Student "<<k+1<<": "<<student[k].name<<endl;
        }
    }
}

void displayRollNo(const vector<Student>& student){
    int roll_no;
    cout<<endl<<"Enter Roll Number to display details: ";
    cin>>roll_no;

    bool found = false;
    for(int l = 0; l < student.size(); l++){
        if(student[l].roll_no == roll_no){
            cout<<endl<<"\tDetails of Student with Roll Number "<<roll_no<<endl;
            cout<<"Name: "<<student[l].name<<endl;
            cout<<"Age: "<<student[l].age<<endl;
            cout<<"Address: "<<student[l].address<<endl;
            found = true;
            break;
        }
    }

    if(!found){
        cout<<"Student with Roll Number "<<roll_no<<" not found.";
    }
}

*/


