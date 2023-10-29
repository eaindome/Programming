// Operator Overloading
// ++ Operator (Unary Operator) Overloading

// Overload ++ when used as prefix

#include <iostream>
using namespace std;

// define class
class Count {
    private:
        int value;

    public:
        // constructor to initialize count to 5
        Count(): value(5) {}

        // overload ++ when used as prefix
        void operator ++ () {
            ++value;
        }

        // display result
        void display() {
            cout<<"Count: "<<value<<endl;
        }
};

int main() {
    Count count1;

    // call the "void operaotr ++ ()" function
    ++count1;

    count1.display();

    return 0;
}