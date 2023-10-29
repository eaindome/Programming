// Operator Overloading

// Return Value from Operator Function (++ Operator)
#include <iostream>
using namespace std;

class Count {
    private:
        int value;

    public:
        // constructor to initialize count to 5
        Count(): value(5) {}

        // overload ++ when used as prefix
        Count operator ++ () {
            Count temp;

            // here, value is the value attribute of the
            // calling object
            temp.value = ++value;

            return temp;
        }

        // overload ++ when used as postfix
        Count operator ++ (int) {
            Count temp;

            // here, value is the value attribute of the
            temp.value = value++;

            return temp;
        }

        // display function
        void display() {
            cout<<"Count: "<<value<<endl;
        }
};

int main() {
    Count count1, result;

    // call the "Count operator ++ ()" function
    result = ++count1;
    result.display();

    // call the "Count operator ++ (int)" function
    result = count1++;
    result.display();

    return 0;
}

