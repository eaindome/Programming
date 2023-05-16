#include <iostream>
#include <cstring>

using namespace std;

int main(){
    struct Student
    {
        int roll_no;
        char name[30];
        int age;
        int marks;
    };


    // create structure variable
    Student p1;
    
    // initialize fields in the correct order
    p1.roll_no = 1;
    strcpy(p1.name, "Brown");
    p1.age = 14;
    p1.marks = 78;

    // print the fields
    cout<<p1.roll_no<<" "<<p1.name<<" "<<p1.age<<" "<<p1.marks<<endl;

    return 0;
}
