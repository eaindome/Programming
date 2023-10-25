// Encapsulation

// Program to calculate the area of a rectangle
#include <iostream>
using namespace std;

// define the class
class Rectangle {
    public:
        // variables required for area calculation
        int length;
        int breadth;

        // constructor to initialize variables
        Rectangle(int len, int brth) :
        length(len), breadth(brth) {}

        // Function to calculate area
        int getArea() {
            return length*breadth;
        }
};

int main(){
    // create object of Rectangle class
    Rectangle rect(8, 6);

    // call getArea() function
    cout<<"Area = "<<rect.getArea();

    return 0;
}

/*
This is only encapsulation. 
We are just keeping similar codes together.
*/
