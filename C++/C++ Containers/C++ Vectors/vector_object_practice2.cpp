/*
Write a program to print the roll number and average marks of 8 students in three subjects (each out of 100). The marks are entered by the user and the roll numbers are automatically assigned.
*/

#include <iostream>
#include <vector>

using namespace std;

class Student {
    private:
        int roll_num;
        double marks1, marks2, marks3;
    public:
        Student(int rn, double m1, double m2, double m3): roll_num(rn), marks1(m1), marks2(m2), marks3(m3){}

        int getRollNum(){return roll_num;}
        double getMarks1(){return marks1;}
        double getMarks2(){return marks2;}
        double getMarks3(){return marks3;}
};

int main(){
    int roll_num, numStudents;
    double marks1, marks2, marks3, total_marks, average;

    vector<Student> students;

    cout<<"How many students' marks are you entering: ";
    cin>>numStudents;

    for(int i = 0; i < numStudents; i++){
        cout<<"Student "<<i+1<<endl;
        cout<<"Enter Roll Number: ";
        cin>>roll_num;
        cout<<"Enter the marks for the first subject: ";
        cin>>marks1;
        cout<<"Enter the marks for the second subject: ";
        cin>>marks2;
        cout<<"Enter the marks for the third subject: ";
        cin>>marks2;

        Student student(roll_num, marks1, marks2, marks3);

        students.push_back(student);
    }

    cout<<endl<<endl;
    cout<<"Displaying Student Details"<<endl;
    for(int j = 0; j < students.size(); j++){
        cout<<"Student "<<j+1<<endl;
        cout<<"Roll Number: "<<students[j].getRollNum()<<endl;
        cout<<"Subject 1 marks: "<<students[j].getMarks1()<<endl;
        cout<<"Subject 2 marks: "<<students[j].getMarks2()<<endl;
        cout<<"Subject 3 marks: "<<students[j].getMarks3()<<endl;

        total_marks = students[j].getMarks1()+students[j].getMarks2()+students[j].getMarks3();
        average = total_marks / 3;

        cout<<"Total Marks: "<<total_marks<<endl;
        cout<<"Average Marks: "<<average<<endl;
    }

    

    return 0;
}


