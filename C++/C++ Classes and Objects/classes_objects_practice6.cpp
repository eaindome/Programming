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
        double side1, side2, side3;

    public:
        void sides(double s1, double s2, double s3){
            side1 = s1;
            side2 = s2;
            side3 = s3;
        }

        double getPerimeter(){
            return side1+side2+side3;
        }

        double getArea(){
            double s = getPerimeter()/2.0;
            return sqrt(s * (s-side1) * (s-side2) * (s-side3));
        }
};

int main() {
    Triangle tri1;

    tri1.sides(3,4,5);

    cout<<"Perimeter of triangle 1 = "<<tri1.getPerimeter()<<"."<<endl;
    cout<<"Area of triangle 1 = "<<tri1.getArea()<<"."<<endl<<endl;

    return 0;
}



/*
Solution:
#include <iostream>
#include <cmath>

using namespace std;

class Triangle {
    private:
        double side1, side2, side3;

    public:
        Triangle(double s1, double s2, double s3) {
            side1 = s1;
            side2 = s2;
            side3 = s3;
        }

        double getArea() {
            double s = (side1 + side2 + side3) / 2.0;
            return sqrt(s * (s - side1) * (s - side2) * (s - side3));
        }

        double getPerimeter() {
            return side1 + side2 + side3;
        }

        void printAreaAndPerimeter() {
            cout << "Area of the triangle is: " << getArea() << endl;
            cout << "Perimeter of the triangle is: " << getPerimeter() << endl;
        }
};

int main() {
    Triangle t(3, 4, 5);
    t.printAreaAndPerimeter();

    return 0;
}
*/



