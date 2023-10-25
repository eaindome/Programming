/*
Write a program to print the area of a rectangle 
by creating a class named 'Area' taking the values of 
its length and breadth as parameters of its constructor and 
having a function named 'returnArea' which returns the area of the rectangle. 
Length and breadth of the rectangle are entered through keyboard.
*/
#include <iostream>
using namespace std;

// define class
class Area {
    private:
        double length, breadth;

    public:
        Area(double len, double brth):
        length(len), breadth(brth) {}

        double returnArea() {
            return length * breadth;
        }
};

int main() {
    // initialize variables
    double length, breadth;

    // receive values
    cout<<"Enter Length: ";
    cin>>length;
    cout<<"Enter Breadth: ";
    cin>>breadth;

    // create rectangle object of area
    Area rectangle(length, breadth);

    // calculate and display area
    cout<<"Area of rectangle: "<<rectangle.returnArea();

    return 0;
}