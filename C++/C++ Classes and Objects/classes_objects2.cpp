/*
In the first session, we learnt how to create a class,
in the class we realized a keyword 'public' which is an access
modifier. 
As per our needs, we can also create private members using the 'private'
keyword.
The private members of a class can only be accessed from within
the class.
    Example:
    class Test {
        private:                          // can't be accessed anywhere besides the class 
            int a;
            void function1(){}

        public:                           // can be accessed anywhere and not only in the class
            int b;
            void function2(){}
    };
*/

// Program to illustrate the working of public and private in C++ Class
#include <iostream>

using namespace std;

class Room {
    private:
        double length, breadth, height;

    public:
        // function to initialize private variables
        void initData(double len, double brth, double hgt){
            length = len;
            breadth = brth;
            height = hgt;
        }

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

    // pass the values of private variables as arguments
    room1.initData(42.5,30.8,19.2);

    cout<<"Area of Room = "<<room1.calculateArea()<<endl;
    cout<<"Volume of Room = "<<room1.calculateVolume()<<endl;

    return 0;
}



