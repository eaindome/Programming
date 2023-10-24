/* Copy Constructor
The copy constructor in C++ is used to copy data of one object to another.
*/

// C++ program to demonstrate the copy constructor
#include <iostream>
using namespace std;

// declare a class
class Wall {
    private:
        double length;
        double height;
    
    public:
        // initialize variables with parameterized constructor
        Wall(double len, double hgt) {
            length = len;
            height = hgt;
        }

        // copy constructor with a Wall object as parameter
        // copies data of the obj parameter
        Wall(Wall &obj) {
            length = obj.length;
            height = obj.height;
        }

        double calculateArea() {
            return length * height;
        }
};

int main() {
    // create object of Wall calss and initialize data members
    Wall wall1(10.5, 8.6);

    // copy contents of wall1 to wall2
    Wall wall2 = wall1;

    // calculate and display area
    cout<<"Area of wall 1: "<<wall1.calculateArea()<<endl;
    cout<<"Area of wall 2: "<<wall2.calculateArea()<<endl;

    return 0;
}

/*
Note: A constructor is primarily used to initialize objects. 
They are also used to run a default code when an object is created.
*/