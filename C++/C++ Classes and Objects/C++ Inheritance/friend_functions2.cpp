// add members of two different classes using friend function

#include <iostream>

using namespace std;

// forward declaration
class ClassB;

class ClassA {
    private:
        int numA;

        // friend function declaration
        friend int add(ClassA, ClassB);

    public:
        // constructor to initialize numA to 12
        ClassA(): numA(12) {}
};

class ClassB {
    public:
        // constructor to initialize numB to 1
        ClassB(): numB(1) {}

    private:
        int numB;

        // friend function declaration
        friend int add(ClassA, ClassB);
};

// access members of both classes
int add(ClassA objectA, ClassB objectB){
    return(objectA.numA + objectB.numB);
}








