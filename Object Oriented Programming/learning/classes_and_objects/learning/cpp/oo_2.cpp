// Operator Overloading
// ++ Operator (Unary Operator) Overloading

// Overload ++ when used as prefix and postfix
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

        // overload ++ when used as postfix
        void operator ++ (int) {
            value++;
        }

        void display() {
            cout<<"Count: "<<value<<endl;
        }
};

int main() {
    Count count1;

    // call the "void operator ++ (int)" function
    count1++;
    count1.display();

    // call the "void operator ++ ()" function
    ++count1;

    count1.display();
    return 0;
}