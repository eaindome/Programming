/*
C++ Constructors:
A constructor is a special type of member function that is automatically 
called when an object is created.
A constructor usually has the same name as that of the class and it
does not have a return type.
    Example:
    class Wall {
        public:
            // create a constructor
            Wall(){
                // code
            }
    };
A constructor with no parameters is known as a 'default constructor'
*/

// C++ program to demonstrate the use default constructor
#include <iostream>

using namespace std;

// declare a class
class Wall {
    private:
        double length;

    public:
        // default constructor to initialize variable
        Wall(){
            length = 5.5;
            cout<<"Creating a wall."<<endl;
            cout<<"Length = "<<length<<endl;
        }
};

int main(){
    Wall wall1;
    return 0;
}

