/*
Write a program to print the volume of a box 
by creating a class named 'Volume' with an 
initialization list to initialize its length, 
breadth and height. 
(just to make you familiar with initialization lists)
*/
#include <iostream>
using namespace std;

// define a class
class Volume {
    private:
        double length, breadth, height;

    public:
        Volume(double len, double brth, double hgt):
        length(len), breadth(brth), height(hgt) {}

        double calculateVolume() {
            return length*breadth*height;
        }
};

int main() {
    // create an object and initialize
    Volume box(4, 3, 5);

    // calculate volume and display results
    cout<<"Volume of box: "<<box.calculateVolume()<<endl;

    return 0;
}