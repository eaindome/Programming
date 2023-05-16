/*
Write a program to print the area of two rectangles having 
sides (4,5) and (5,8) respectively by creating a class named 
'Rectangle' with a function named 'Area' which returns the 
area. Length and breadth are passed as parameters to its 
constructor.
*/

#include <iostream>
#include <cmath>

using namespace std;

class Rectangle {
    private:
        double side1, side2;

    public:
        Rectangle(double s1, double s2) : side1(s1), side2(s2){}

        double getArea(){
            return side1 * side2;
        }
};

int main() {
    Rectangle rect1(4,5), rect2(5,8);
    
    cout<<"The area of the first rectangle = "<<rect1.getArea()<<"."<<endl;
    cout<<"The area of the second rectangle = "<<rect2.getArea()<<"."<<endl;

    return 0;
}


/*
#include <iostream>
using namespace std;

class Rectangle {
private:
    int length;
    int breadth;

public:
    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }

    int Area() {
        return length * breadth;
    }
};

int main() {
    Rectangle r1(4, 5);
    Rectangle r2(5, 8);

    cout << "Area of rectangle 1 = " << r1.Area() << " square units" << endl;
    cout << "Area of rectangle 2 = " << r2.Area() << " square units" << endl;

    return 0;
}

*/













