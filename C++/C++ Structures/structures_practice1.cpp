/*
Write a program to store and print the roll no., name , age 
and marks of a student using structures.
*/

#include <iostream>
#include <string>

using namespace std;

// structure declaration
struct Student
{
    int roll_no, age, marks;
    string name;
};

// function declaration
Student getData(Student);
void displayData(Student);

int main(){
    char choice;

    // create a structure variable
    Student s;

    s = getData(s);

    cout<<"Do you want to display information: \n"
        <<"1. Yes \n"<<"2. No \n"<<"Enter 1 or 2: ";
    cin>>choice;
    if (choice == '1'){
        displayData(s);
    }

    return 0;
}

// function definitions
Student getData(Student s){
    // ask for user input
    cout<<"Enter roll number: ";
    cin>>s.roll_no;

    // consume the newline character left in the input stream
    cin.ignore();

    cout<<"Enter Full Name: ";
    getline(cin, s.name);

    cout<<"Enter age: ";
    cin>>s.age;

    cout<<"Enter marks: ";
    cin>>s.marks;

    return s;
}

void displayData(Student s){
    cout<<"\t\tDisplaying Information"<<endl;
    cout<<"Roll Number: "<<s.roll_no<<endl;
    cout<<"Name: "<<s.name<<endl;
    cout<<"Age: "<<s.age<<endl;
    cout<<"Marks: "<<s.marks<<endl;
}



/*
There is a problem with the getData function. 
When the getline function is called after cin >> s.roll_no, 
it will read the newline character left in the input stream,
 instead of waiting for the user input for the name. 
 To fix this, we need to consume the newline character before 
 calling getline. One way to do this is to use cin.ignore() 
 before calling getline.
*/