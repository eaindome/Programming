/*
Write a program to calculate the average height of all the students of a class. The number of students and their heights are entered by the user.
*/

#include <iostream>

using namespace std;

class Student {
    private:
        double height;
    public:
        Student() = default;

        void setHeight(double h){
            height = h;
        }

        double getHeight(){return height;}
};

int main() {
    int numStudents;
    double height, average_height, total_height=0;

    cout<<"Enter the number of Students: ";
    cin>>numStudents;

    Student student[numStudents];

    for(int i = 0; i < numStudents; i++){
        cout<<"Student "<<i+1<<": \n";
        cout<<"Height: ";
        cin>>height;

        student[i].setHeight(height);

        total_height += height;
    }
    cout<<endl<<endl;

    average_height = total_height / numStudents;

    cout<<"Average height of all students: "<<average_height<<endl;

    return 0;
}

/*
another solution
#include <iostream>

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
    double height, sum = 0;

    cout << "How many students are in the class: ";
    cin >> numStudents;

    Student *students = new Student[numStudents];

    for(int i = 0; i < numStudents; i++){
        cout << "Student " << i+1 << endl;
        cout << "Height: ";
        cin >> height;

        Student sdent(height);

        students[i] = sdent;
    }

    for(int i = 0; i < numStudents; i++){
        sum += students[i].getHeight();
    }

    double average = sum / numStudents;

    cout << "The average height of the class is " << average << endl;

    delete[] students;

    return 0;
}
*/






