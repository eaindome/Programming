#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Marks {
    protected:
        int roll_num;
        double marks;
        string name;
        static int nextRollNum;
    public:
        Marks(string n): roll_num(nextRollNum++), name(n), marks() {}

        virtual void printMarks() = 0;

        double getMarks() {
            return marks;
        }

        void setMarks(double num){
            marks = num;
        }
};

int Marks::nextRollNum = 1;

class Physics: public Marks {
    public:
        Physics(string n): Marks(n) {}

        void printMarks(){
            cout<<"Roll Number: "<<roll_num<<" Physics Marks: "<<getMarks()<<endl;
        }
};

class Chemistry: public Marks {
    public:
        Chemistry(string n): Marks(n) {}

        void printMarks(){
            cout<<"Roll Number: "<<roll_num<<" Chemistry Marks: "<<getMarks()<<endl;
        }
};

class Mathematics: public Marks {
    public:
        Mathematics(string n): Marks(n) {}

        void printMarks(){
            cout<<"Roll Number: "<<roll_num<<" Mathematics Marks: "<<getMarks()<<endl;
        }
};

int main() {
    int numStudents;
    cout<<"Enter the number of students in the class: ";
    cin>>numStudents;

    vector<Marks*> students;
    string name;
    double phyMarks, chemMarks, mathMarks;

    for (int i = 0; i < numStudents; i++){
        cout<<"Enter Full Name of Student: "<<i+1<<endl;
        cin.ignore();
        getline(cin, name);

        cout<<"Enter the marks for Physics, Chemistry and Mathematics in this order. \n"
            <<"Separate them with spaces: ";
        cin>>phyMarks>>chemMarks>>mathMarks;

        Physics* physObj = new Physics(name);
        physObj->setMarks(phyMarks);
        students.push_back(physObj);

        Chemistry* chemObj = new Chemistry(name);
        chemObj->setMarks(chemMarks);
        students.push_back(chemObj);

        Mathematics* mathObj = new Mathematics(name);
        mathObj->setMarks(mathMarks);
        students.push_back(mathObj);
    }

    double total_marks = 0;

    for(auto f: students){
        f->printMarks();                        // print the marks of each subject
        total_marks += f->getMarks();           // add the marks to the total
    }

    double average;
    average = total_marks / (numStudents*3);

    cout<<"\nTotal Marks: \n";
    for(int i = 0; i < numStudents; i++){
        cout<<"Student "<<i+1<<": "<<total_marks<<endl;
        total_marks -= 3*100;                   // assuming 100 is the maximum marks in each subject
    }

    cout<<"\nAverage Marks: "<<average<<endl;

    // free memory allocated for students
    for(auto f: students){
        delete f;
    }

    return 0;
}










