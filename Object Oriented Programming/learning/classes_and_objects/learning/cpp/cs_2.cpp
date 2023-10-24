/* Parameterized Constructor
In C++, a constructor with parameters is known as a parameterized constructor. 
This is the preferred method to initialize member data.
*/

// C++ program to calculate the area of a wall
#include <iostream>
using namespace std;

// declare a class
class Wall {
    private:
        double lenght;
        double height;
    
    public:
        // parameterized constructor to initialize variables
        Wall(double len, double hgt) {
            lenght = len;
            height = hgt;
        }

        double calculateArea() {
            return lenght * height;
        }
};

int main() {
    // create object and initialize data members
    Wall wall1(10.5, 8.6);
    Wall wall2(8.5, 6.3);

    // calculate and display area
    cout<<"Area of wall 1: "<<wall1.calculateArea()<<endl;
    cout<<"Area of wall 2: "<<wall2.calculateArea()<<endl;

    return 0;
}