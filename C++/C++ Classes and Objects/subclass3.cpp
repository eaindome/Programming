/*
Create a class named 'Rectangle' with two data members 'length' and 'breadth' and two functions to print the area and perimeter of the rectangle respectively. Its constructor having parameters for length and breadth is used to initialize the length and breadth of the rectangle. Let class 'Square' inherit the 'Rectangle' class with its constructor having a parameter for its side (suppose s) calling the constructor of its parent class. Print the area and perimeter of a rectangle and a square.
*/

#include <iostream>

using namespace std;

class Rectangle {
    protected:
        double length, breadth;
    public:
        Rectangle(double l, double b): length(l), breadth(b){}

        void area(){
            double area = length * breadth;
            cout<<"Area = "<<area<<endl<<endl;
        }

        void perimeter(){
            double perimeter = 2*(length+breadth);
            cout<<"Perimeter = "<<perimeter<<endl<<endl;
        }
};

class Square: public Rectangle {
    private:
        double side;
    public:
        Square(double s): Rectangle(s, s){}
};


int main(){
    Rectangle rect(4, 5);
    Square sq(4);

    rect.area();
    rect.perimeter();

    sq.area();
    sq.perimeter();

    return 0;
}
