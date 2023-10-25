/*
Write a program to print the area of a rectangle by 
creating a class named 'Area' having two functions. 
First function named as 'setDim' takes the length and breadth of the rectangle as 
parameters and the second function named as 'getArea' returns the area of the rectangle. 
Length and breadth of the rectangle are entered through keyboard.
*/

#include <iostream>
using namespace std;

// define class
class Area {
    private:
        double length, breadth;

    public:
        void setDim(double len, double brth) {
            length = len;
            breadth = brth;
        }

        double getArea() {
            return length*breadth;
        }
};

int main() {
    // create an object of the class
    Area rectangle;

    // set dimension
    rectangle.setDim(8, 6);

    // get area
    cout<<"Area: "<<rectangle.getArea();

    return 0;
}