#include <iostream>
#include <string>
#include <vector>
#include <limits>

using namespace std;

class Marks {
    private:
        int roll_num;
        double marks;
        string name;
        static int nextRollNum;
    protected:
        int getRollNum() const {
            return roll_num;
        }
    public:
        Marks(string n): name(n), roll_num(nextRollNum++), marks(){}

        virtual void printMarks()=0;

        double getMarks() const {
            return marks;
        }

        void setMarks(double num){
            marks = num;
        }
};

int Marks::nextRollNum = 1;

class Physics: public Marks {
    public:
        Physics(string n): Marks(n){}

        void printMarks(){
            cout<<"Roll Number: "<<getRollNum()<<" Physics Marks: "<<getMarks()<<endl;
        }
};

class Chemistry: public Marks {
    public:
        Chemistry(string n): Marks(n){}

        void printMarks(){
            cout<<"Roll Number: "<<getRollNum()<<" Physics Marks: "<<getMarks()<<endl;
        }
};

class Mathematics: public Marks {
    public:
        Mathematics(string n): Marks(n){}

        void printMarks(){
            cout<<"Roll Number: "<<getRollNum()<<" Physics Marks: "<<getMarks()<<endl;
        }
};



int main() {
    int numStudents;
    string name;
    double phyMarks, chemMarks, mathMarks, average;

    vector<Marks*> students;

    cout<<"Enter the number of Students you want to enter: ";
    cin>>numStudents;

    while(cin.fail()){
        cout<<"Please enter a valid number: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin>>numStudents;
    }

    for(int i = 0; i < numStudents; i++){
        do {
            cout<<"Enter Full Name of Student "<<i+1<<": ";
            cin.ignore();
            getline(cin, name);
        } while(name.empty());

        cout<<"Enter the marks for Physics, Chemistry and Mathematics. \n"
            <<"Separate them with spaces: ";
        cin>>phyMarks>>chemMarks>>mathMarks;

        while(cin.fail()){
            cout<<"Please enter valid numbers: ";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cin>>phyMarks>>chemMarks>>mathMarks;
        }

        Physics* physObj = new Physics(name);
        physObj->setMarks(phyMarks);
        students.push_back(physObj);

        Chemistry* chemObj = new Chemistry(name);
        chemObj->setMarks(chemMarks);
        students.push_back(chemObj);

        Mathematics* mathObj = new Mathematics(name);
        mathObj->setMarks(mathMarks);
    }

    double total_marks = 0;
    
    for(auto f: students){
        f->printMarks();                // print the marks for each subject
        total_marks += f->getMarks();    // add it to the total marks
    }

    cout<<"\nTotal Marks: \n";
    for(int i = 0; i < numStudents; i++){
        cout<<"Student "<<i+1<<": "<<total_marks<<endl;
        total_marks -= 3 * 100;             // assuming each subject is graded over 100
    }

    average = total_marks / (numStudents * 3);

    cout<<"\nAverage Marks: "<<average<<endl;

    // free memory allocated student spaces
    for(auto f: students){
        delete f;
    } 

    return 0;
}










