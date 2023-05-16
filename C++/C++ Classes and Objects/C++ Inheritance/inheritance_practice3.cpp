/*
We want to calculate the total marks of each student of a 
class in Physics,Chemistry and Mathematics and the average 
marks of the class. The number of students in the class are 
entered by the user. Create a class named Marks with data 
members for roll number, name and marks. Create three other 
classes inheriting the Marks class, namely Physics, Chemistry 
and Mathematics, which are used to define marks in individual 
subject of each student. Roll number of each student will be 
generated automatically.
*/

#include <iostream>
#include <string>
#include <vector>
#include <limits>


using namespace std;

class Marks {
    protected:
        int roll_num;
        double marks;
        string name;
        static  int nextRollNum;
    public:
        Marks(string n): roll_num(nextRollNum++), name(n), marks(){}
        virtual void printMarks() = 0;

        double getMarks() {
            return marks;
        }

        void setMarks(double m){
            marks = m;
        }
};

int Marks::nextRollNum = 1;

class Physics: public Marks {
    public:
        Physics(string n): Marks(n){}

        void printMarks(){
            cout<<"Roll Number: "<<roll_num<<"Physics Marks: "<<getMarks()<<endl;
        }
};

class Chemistry: public Marks {
    public:
        Chemistry(string n): Marks(n){}
        void printMarks(){
            cout<<"Roll Number: "<<roll_num<<"Chemistry Marks: "<<getMarks()<<endl;
        }
};

class Mathematics: public Marks {
    public:
        Mathematics(string n): Marks(n){}
        void printMarks() {
            cout<<"Roll Number: "<<roll_num<<"Mathematics Marks: "<<getMarks()<<endl;
        }
};

int main() {
    vector<Marks*> students;
    int numStudents;
    string name;
    double phyMarks, chemMarks, mathMarks;

    cout<<"Enter the number of Students: ";
    cin>>numStudents;

    for(int i = 0; i < numStudents; i++){
        cout<<"Enter Full Name of student"<<i+1<<": ";
        cin.ignore();
        getline(cin, name);

        cout<<"Enter the Marks for Physics, Chemistry and Maths in this order.\n" 
            <<"Separate them with spaces: ";
        cin>>phyMarks>>chemMarks>>mathMarks;

        students.push_back(new Physics(name));
        students.push_back(new Chemistry(name));
        students.push_back(new Mathematics(name));

        // set the marks for each subject
        dynamic_cast<Physics*>(students[3*i])->setMarks(phyMarks);
        dynamic_cast<Chemistry*>(students[3*i+1])->setMarks(chemMarks);
        dynamic_cast<Mathematics*>(students[3*i+2])->setMarks(mathMarks);
    }

    double total_marks = 0;

    for(auto f: students){
        f->printMarks();                // print the marks of each subject
        total_marks += f->getMarks();   // add the marks to the total
    }

    double average;

    average = total_marks / (3*numStudents);

    cout<<"\nTotal Marks of each Student: \n";
    for(int i = 0; i < students.size(); i++){
        cout<<"Student "<<i+1<<": ";
        double total = 0;
        for(int j = 0; j < 3; j++){
            total += students[3*i+j]->getMarks();
        }
        cout<<total<<endl;
    }

    cout<<"\nAverage marks of the Class: "<<average<<endl;

    // free memory allocated for students
    for(auto f: students){
        delete f;
    } 

    return 0;
}




