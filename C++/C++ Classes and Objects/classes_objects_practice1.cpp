/*
Create a class named 'Student' with a string variable 'name' and an integer 
variable 'roll_no'. Assign the value of roll_no as '2' and 
that of name as "John" by creating an object of the class Student.
*/

#include <iostream>

using namespace std;

class Student {
    private:
        string name;
        int roll_no;

    public:
        Student(string n, int r){
            name = n;
            roll_no = r;
        }

        void display(){
            cout<<"Name of Student is "<<name<<endl;
            cout<<"Roll No of Student is "<<roll_no<<endl;
        }        
};



int main(){
    string name;
    int roll_no;

    cout<<"Enter name of Student: ";
    getline(cin, name);
    cout<<"Enter roll no: ";
    cin>>roll_no;

    // create a student object
    Student student1(name, roll_no);

    student1.display();

    return 0;
}







