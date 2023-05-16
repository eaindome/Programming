/*
Assign and print the roll number, phone number and address of 
two students having names "Sam" and "John" respectively by 
creating two objects of the class 'Student'.
*/
#include <iostream>

using namespace std;

class Student {
    private:
        string address, name;
        int roll_no, phone_no;

    public:
        Student(string a, string n, int r, int p){
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
    string name, address;
    int phone_no, roll_no;

    cout<<"Enter Name: ";
    getline(cin, name);
    cout<<"Enter Roll number: ";
    cin>>roll_no;
    cout<<"Enter address: ";
    cin.ignore();
    getline(cin, address);
    cout<<"Enter phone number: ";
    cin>>phone_no;
    cout<<endl;

    Student student1(address, name, roll_no, phone_no);

    cin.ignore();
    cout<<"Enter Name: ";
    getline(cin, name);
    cout<<"Enter Roll number: ";
    cin>>roll_no;
    cout<<"Enter address: ";
    cin.ignore();
    getline(cin, address);
    cout<<"Enter phone number: ";
    cin>>phone_no;
    cout<<endl;
    
    Student student2(address, name, roll_no, phone_no);

    student1.display();
    student2.display();

    return 0;
}



/*
Solution:
#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int roll_no;
    string address;
    int phone_no;
public:
    Student(string n, int r, string a, int p) {
        name = n;
        roll_no = r;
        address = a;
        phone_no = p;
    }

    void display() {
        cout << "Name: " << name << endl;
        cout << "Roll No.: " << roll_no << endl;
        cout << "Address: " << address << endl;
        cout << "Phone No.: " << phone_no << endl;
    }
};

int main() {
    // create two student objects
    Student sam("Sam", 101, "123 Main St", 5551234);
    Student john("John", 102, "456 Elm St", 5555678);

    // print the information of the students
    cout << "Information of Student Sam:" << endl;
    sam.display();

    cout << "\nInformation of Student John:" << endl;
    john.display();

    return 0;
}
*/











