/*
Create a class named Shape with a function that prints "This is a shape". Create another class named Polygon inheriting the Shape class with the same function that prints "Polygon is a shape". Create two other classes named Rectangle and Triangle having the same function which prints "Rectangle is a polygon" and "Triangle is a polygon" respectively. Again, make another class named Square having the same function which prints "Square is a rectangle".
Now, try calling the function by the object of each of these classes.
*/

#include <iostream>

using namespace std;

class Shape {
    public:
        void printShape(){
            cout<<"This is a Shape."<<endl;
        }
};

class Polygon: public Shape {
    public:
        void printShape(){
            cout<<"Polygon is a shape."<<endl;
        }
};

class Rectangle: public Polygon {
    public:
        void printShape(){
            cout<<"Rectangle is a Polygon."<<endl;
        }
};

class Triangle: public Polygon {
    public:
        void printShape(){
            cout<<"Triangle is a Polygon."<<endl;
        }
};

class Square: public Rectangle {
    public:
        void printShape(){
            cout<<"Square is a Rectangle."<<endl;
        }
};

int main(){
    Shape shape;
    Polygon poly;
    Rectangle rect;
    Triangle tri;
    Square sq;

    shape.printShape();
    cout<<endl;
    poly.printShape();
    cout<<endl;
    rect.printShape();
    cout<<endl;
    tri.printShape();
    cout<<endl;
    sq.printShape();
    cout<<endl;

    return 0;
}

