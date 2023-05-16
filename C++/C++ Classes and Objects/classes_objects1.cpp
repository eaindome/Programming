/*
C++ Class:
It's the blueprint for the object.
    Syntax:
    class classNmae {
        // some data
        // some functions
    };

    Example:
    class Room {                                    // class Room
        public:
            double length;
            double breadth;
            double height;

            double calculateArea(){
                return length * breadth;
            }

            double calculateVolume(){
                return length * breadth * height;
            }
    };

C++ Objects:
    Syntax to Define Object:
    className objectVariableName;

    we can create objects of Room class (defined in the above example) as follows:

    // sample function
    void sampleFunction(){
        // create objects
        Room room1, room2;
    }

    int main(){
        // create objects
        Room room3, room4;
    }

C++ Access Data Members and Member functions:
We can access the data members and member functions of a class 
by using the dot operator(.).
    Example:
    room2.calculateArea();
*/

// Illustrating the working of objects and class in C++ programming

#include <iostream>

using namespace std;

// create a class
class Room {
    public:
        double length, breadth, height;

        double calculateArea(){
            return length * breadth;
        }

        double calculateVolume(){
            return length * breadth * height;
        }
};

int main(){
    // create object of Room class
    Room room1;

    // assign values to data members
    room1.length = 42.5;
    room1.breadth = 30.8;
    room1.height = 19.2;

    // calculate and display the area and volume of the room
    cout<<"Area of Room = "<<room1.calculateArea()<<endl;
    cout<<"Volume of Room = "<<room1.calculateVolume()<<endl;

    return 0;
}












