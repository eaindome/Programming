/*
Print the sum, difference and product of 
two complex numbers by creating a class named 'Complex' 
with separate functions for each operation whose real and imaginary parts 
are entered by the user.
*/
#include <iostream>
using namespace std;

// define class
class Complex {
    private:
        double real, imaginary;

    public:
        Complex(double rel, double img):
        real(rel), imaginary(img) {}

        // getters for real and imaginary numbers
        double getReal() { return real; }
        double getImg() { return imaginary; }

        void sumComNum(Complex num1) {
            cout<<"Sum: "<<num1.getReal() + real<<" + "<<num1.getImg() + imaginary<<"j"<<endl;
        }

        void diffComNum(Complex num1) {
            cout<<"Difference: "<<num1.getReal() - real<<" + "<<num1.getImg() - imaginary<<"j"<<endl;
        }

        void prodComNum(Complex num1) {
            cout<<"Product: "<<num1.getReal() * real<<" + "<<num1.getImg() * imaginary<<"j"<<endl;
        }
};

int main() {
    // create objects of class
    Complex num1(4, 5);
    Complex num2(2, 3);

    // add
    num1.sumComNum(num2);

    // subtract
    num1.diffComNum(num2);

    // multiply
    num1.prodComNum(num2);

    return 0;
}