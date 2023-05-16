/*
Write a program to print the roll number and average marks of 8 students in three subjects (each out of 100). The marks are entered by the user and the roll numbers are automatically assigned.
*/

#include <iostream>
#include <string>

using namespace std;

class Student {
    private:
        int roll_num;
        double marks[3];
    public:
        Student(int rn): roll_num(rn){}
        Student() = default;

        void setMarks(double m1, double m2, double m3){
            marks[0] = m1;
            marks[1] = m2;
            marks[2] = m3;
        }

        int getRollNum(){return roll_num;}

        double getAveragemarks(){
            double total_marks = 0;
            for(int i=0; i<3; i++){
                total_marks += marks[i];
            }
            return total_marks / 3;
        }
};

int main() {
    int roll_num, numStudents = 8;
    double marks1, marks2, marks3;

    Student students[numStudents];

    for(int i = 0; i<numStudents; i++){
        roll_num = i+1;
        cout<<"Enter the marks for the first subject for student "<<roll_num<<": ";
        cin>>marks1;
        cout<<"Enter the marks for the second subject for student "<<roll_num<<": ";
        cin>>marks2;
        cout<<"Enter the marks for the third subject for student "<<roll_num<<": ";
        cin>>marks3;

        Student student(roll_num);

        student.setMarks(marks1, marks2, marks3);

        students[i] = student;
    }

    cout<<endl<<endl;
    cout<<"Displaying Student Details"<<endl;
    for(int j = 0; j <  numStudents; j++){
        cout<<"Student "<<j+1<<endl;
        cout<<"Roll Number: "<<students[j].getRollNum()<<endl;
        cout<<"Average Marks: "<<students[j].getAveragemarks()<<endl<<endl;
    }

    return 0;
}












