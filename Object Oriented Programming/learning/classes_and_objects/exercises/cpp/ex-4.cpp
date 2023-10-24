/*
Write a program to print the area and perimeter of a triangle having sides 
of 3, 4 and 5 units by creating a class named 'Triangle' with the constructor 
having the three sides as its parameters.
*/

#include <iostream>
using namespace std;

// define class
class Triangle {
    private:
        double side1, side2, side3;
    
    public:
        Triangle(double sid1, double sid2, double sid3) {
            side1 = sid1;
            side2 = sid2;
            side3 = sid3;
        }

        double calculateArea() {
            return calculatePerimeter()/2.0;
        }

        double calculatePerimeter() {
            return side1+side2+side3;
        }
};

int main() {
    // create objects of class and assign values
    Triangle tri(3, 4, 5);

    // calculate area and perimeter and display results
    cout<<"Area of Triangle tri = "<<tri.calculateArea()<<endl;
    cout<<"Perimeter of Triangle tri = "<<tri.calculatePerimeter()<<endl;

    return 0;
}