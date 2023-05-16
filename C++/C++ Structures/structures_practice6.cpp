/*
Write a program to add, subtract and multiply two complex numbers using structures to function.
*/

#include <iostream>

using namespace std;

struct Complex_Num {
    double real_part, img_part;
};

void sum(Complex_Num, Complex_Num);
void subtract(Complex_Num, Complex_Num);
void multiply(Complex_Num, Complex_Num);

int main(){
    // create structure variables
    Complex_Num num1, num2;

    // ask user input
    cout<<"Enter real part of first number: ";
    cin>>num1.real_part;
    cout<<"Enter imaginary part of first number: ";
    cin>>num1.img_part;

    cout<<endl<<"Enter real part of second number: ";
    cin>>num2.real_part;
    cout<<"Enter imaginary part of second number: ";
    cin>>num2.img_part;

    cout<<endl;
    sum(num1, num2);
    cout<<endl;
    subtract(num1, num2);
    cout<<endl;
    multiply(num1, num2);

    return 0;
}

void sum(Complex_Num num1, Complex_Num num2){
    Complex_Num result;

    result.real_part = num1.real_part + num2.real_part;
    result.img_part = num1.img_part + num2.img_part;

    cout<<"The sum of the two complex numbers given are : "<<result.real_part<<" + "<<result.img_part<<"j.";
}

void subtract(Complex_Num num1, Complex_Num num2){
    Complex_Num result;

    result.real_part = num1.real_part - num2.real_part;
    result.img_part = num1.img_part - num2.img_part;

    cout<<"The difference of the two complex numbers given are : "<<result.real_part<<" + "<<result.img_part<<"j.";
}

void multiply(Complex_Num num1, Complex_Num num2){
    Complex_Num result;

    result.real_part = num1.real_part * num2.real_part;
    result.img_part = num1.img_part * num2.img_part;

    cout<<"The product of the two complex numbers given are : "<<result.real_part<<" + "<<result.img_part<<"j.";
}








// a different solution
/*
#include <iostream>
using namespace std;

struct ComplexNum {
    double real;
    double imag;
};

ComplexNum add(ComplexNum num1, ComplexNum num2) {
    ComplexNum result;
    result.real = num1.real + num2.real;
    result.imag = num1.imag + num2.imag;
    return result;
}

ComplexNum subtract(ComplexNum num1, ComplexNum num2) {
    ComplexNum result;
    result.real = num1.real - num2.real;
    result.imag = num1.imag - num2.imag;
    return result;
}

ComplexNum multiply(ComplexNum num1, ComplexNum num2) {
    ComplexNum result;
    result.real = num1.real * num2.real - num1.imag * num2.imag;
    result.imag = num1.imag * num2.real + num1.real * num2.imag;
    return result;
}

int main() {
    // create structure variables
    ComplexNum num1, num2, sum, difference, product;

    // ask user input
    cout << "Enter real and imaginary parts of first number: ";
    cin >> num1.real >> num1.imag;

    cout << "Enter real and imaginary parts of second number: ";
    cin >> num2.real >> num2.imag;

    // perform addition, subtraction and multiplication
    sum = add(num1, num2);
    difference = subtract(num1, num2);
    product = multiply(num1, num2);

    // display results
    cout << "Sum: " << sum.real << " + " << sum.imag << "i" << endl;
    cout << "Difference: " << difference.real << " + " << difference.imag << "i" << endl;
    cout << "Product: " << product.real << " + " << product.imag << "i" << endl;

    return 0;
}

*/