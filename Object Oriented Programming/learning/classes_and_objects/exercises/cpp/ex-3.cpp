/*
Write a program to print the area and perimeter of a triangle having sides 
of 3, 4 and 5 units by creating a class named 'Triangle' with a function to 
print the area and perimeter.
*/

#include <iostream>
using namespace std;

// define class
class Triangle {
    private:
        double side1, side2, side3;
    
    public:
        void print_area(
            double sid1, double sid2, double sid3
        ) {
            double area = (sid1+sid2+sid3)/2.0;
            cout<<"Area: "<<area<<endl;
            cout<<"Perimeter: "<<(sid1+sid2+sid3)<<endl;
        }
};

int main() {
    // create an object and assign values
    Triangle tri;
    tri.print_area(3, 4, 5);

    return 0;
}


