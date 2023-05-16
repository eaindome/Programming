/*
Write a program to print the area and perimeter of a triangle 
having sides of 3, 4 and 5 units by creating a class named 
'Triangle' with a function to print the area and perimeter.
*/

#include <iostream>
#include <cmath>

using namespace std;

class Triangle {
    private:
        float side1, side2, side3;

    public:
        Triangle(float s1, float s2, float s3) : side1(s1), side2(s2), side3(s3){}

        double getPerimeter(){
            return side1+side2+side3;
        }

        double getArea(){
            double s = getPerimeter()/2.0;
            return sqrt(s * (s - side1) * (s - side2) * (s - side3));
        }
};

int main() {
    Triangle triangle1(3,4,5);

    cout<<"Perimeter of triangle = "<<triangle1.getPerimeter()<<endl;
    cout<<"Area of triangle = "<<triangle1.getArea()<<endl;

    return 0;
}








