// Creating a class in C++
/*
    Syntax:
    class className {
        some data
        some functions
    };
*/

class Room {
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

/*
The variables length, breadth, and height declared inside the class are known as data members.
The functions calculateArea() and calculateVolume() are known as member functions of a class.
*/

// defining an object
/*
    Syntax:
    className objectVariableName;
*/

// sample function
void sampleFunction() {
    // create objects
    Room room1; 
}

int main() {
    // create objects
    Room room3, room4;
}

