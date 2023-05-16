/*
Write a program to calculate the average height of all the students of a class. The number of students and their heights are entered by the user.
*/

#include <iostream>
#include <vector>

using namespace std;

class Student {
    private:
        double height;
    public:
        Student(double h): height(h){}

        double getHeight(){return height;}
};

int main() {
    int numStudents;
    double height, total_height = 0;

    vector<Student> sheight;

    cout<<"How many students' height do you want to enter: ";
    cin>>numStudents;

    for(int i = 0; i < numStudents; i++){
        cout<<"Student "<<i+1<<": \n";
        cout<<"Height: ";
        cin>>height;

        Student sdent(height);

        sheight.push_back(sdent);

        total_height += height;
    }

    double average_height;

    average_height = total_height / numStudents;

    cout<<"Average height of all students: "<<average_height<<endl;

    return 0;
}
















