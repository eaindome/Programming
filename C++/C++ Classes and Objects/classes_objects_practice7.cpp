/*
Write a program to print the area of a rectangle by creating a 
class named 'Area' taking the values of its length and 
breadth as parameters of its constructor and having a function 
named 'returnArea' which returns the area of the rectangle. 
Length and breadth of the rectangle are entered through 
keyboard.
*/

#include <iostream>

using namespace std;

class Area {
    private:
        double length, breadth;

    public:
        Area(double l, double b):length(l), breadth(b){}

        double returnArea(){
            return length * breadth;
        }
};

int main(){
    double length, breadth;

    cout<<"Enter length of shape(rectangle/square): ";
    cin>>length;

    cout<<"Enter breadth of shape(rectangle/square): ";
    cin>>breadth;

    Area shape(length, breadth);
    
    cout<<"Area of shape = "<<shape.returnArea()<<"."<<endl;
    
    return 0;
}







