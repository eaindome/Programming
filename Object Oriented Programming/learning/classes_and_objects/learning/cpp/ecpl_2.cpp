// Encapsulation
// Data Hiding

// Data Hiding using the private specifier
#include <iostream>
using namespace std;

// define class
class Rectangle {
    private:
        // variables required for area calculation
        int length, breadth;
    
    public:
        // setter function for length
        void setLength(int len) {
            length = len;
        }

        // setter function for breadth
        void setBreadth(int brth) {
            breadth = brth;
        }

        // getter function for length
        double getLength() {
            return length;
        }

        // getter function for breadth
        double getBreadth() {
            return breadth;
        }

        // function to calculate area
        double getArea() {
            return length*breadth;
        }
};

int main() {
    // create object of class
    Rectangle rectangle1;

    // set length and breadth
    rectangle1.setLength(8);
    rectangle1.setBreadth(6);

    // access length and breadth 
    cout<<"Length = "<<rectangle1.getLength()<<endl;
    cout<<"Breadth = "<<rectangle1.getBreadth()<<endl;

    // calculate area
    cout<<"Area = "<<rectangle1.getArea();

    return 0;
}

/*
Making the variables private allowed us to 
restrict unauthorized access from outside the class. 
This is data hiding.
*/