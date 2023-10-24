/* Program to illustrate the working of objects
anc class in c++
*/

#include <iostream>
using namespace std;

// create a class
class Room {
    public:
        double length;
        double breadth;
        double height;

        double calculateArea() {
            return length * breadth;
        }

        double calculateVolume() {
            return length * breadth * height;
        }
};

int main() {
    // reate object of room class
    Room room1;

    // assign values ot data members
    room1.length = 42.5;
    room1.breadth = 30.8;
    room1.height = 19.2;

    // calculate and display the area and volume of the room
    cout<<"Area of the Room "<<room1.calculateArea()<<endl;
    cout<<"Volume of the Room "<<room1.calculateVolume()<<endl;

    return 0;
}