/*
C++ Parameterized Constructor:
A constructor with parameters is known as a parameterized constructor.
*/

// C++ program to calculate the area of a wall
#include <iostream>

using namespace std;

// declare a class
class Wall {
    private:
        double length, height;

    public:
        // parameterized constructor to initialize variables
        Wall(double len, double hgt){
            length = len;
            height = hgt;
        }

        double calculateArea(){
            return length * height;
        }
};

int main(){
    // create object and initialize data members
    Wall wall1(10.5, 8.6);
    Wall wall2(8.5, 6.3);

    cout<<"Area of Wall 1: "<<wall1.calculateArea()<<endl;
    cout<<"Area of Wall 2: "<<wall2.calculateArea()<<endl;

    return 0;
}





