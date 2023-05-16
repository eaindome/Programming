// Practice question 2 for not just two student but for multiple students
#include <iostream>
#include <vector>

using namespace std;

class Student {
    private:
        string name, address;
        int roll_no, phone_no;

    public:
        Student(string n, string a, int r, int p){
            name = n;
            address = a;
            roll_no = r;
            phone_no = p;
        }

        void display(){
            cout<<"Name: "<<name<<endl;
            cout<<name<<"'s address: "<<address<<endl;
            cout<<name<<"'s roll number: "<<roll_no<<endl;
            cout<<name<<"'s phone number: "<<phone_no<<endl<<endl;
        }
};

int main(){
    vector<Student> students;       // create a vector to store multiple students
    string name, address;
    int roll_no, phone_no, num_students;

    cout<<"How many student information do you want to enter: ";
    cin>>num_students;

    for(int i = 0; i < num_students; i++){
        cout<<"\nStudent "<<i+1<<endl;
        cout<<"Enter Name: ";
        cin.ignore();
        getline(cin, name);
        cout<<"Enter Roll number: ";
        cin>>roll_no;
        cout<<"Enter address: ";
        cin.ignore();
        getline(cin, address);
        cout<<"Enter phone number: ";
        cin>>phone_no;

        Student student(address, name, roll_no, phone_no);

        students.push_back(student);
    }

    cout<<"\n\tStudent Details: "<<endl;

    for(int j = 0; j < students.size(); j++){
        cout<<"\nDetails of student "<<j+1<<endl;
        students[j].display();                      // display the details of each student
    }

    return 0;
}

