/*
Write a program to print the volume of a box by creating a 
class named 'Volume' with an initialization list to initialize 
its length, breadth and height. (just to make you familiar 
with initialization lists)
*/

#include <iostream>

using namespace std;

class Volume {
    private:
        double length, breadth, height;

    public:
        Volume(double l, double b, double h):length(l),breadth(b),height(l){}

        double volume(){
            return length * breadth * height;
        }
};

int main(){
    double length, width, height;

    cout<<"Enter the length, breadth and height separated by spaces: \n";
    cin>>length>>width>>height;

    Volume shape1(length, width, height);

    cout<<"The volume of the shape with the entered figure is: "<<shape1.volume()<<endl;

    return 0;
}












