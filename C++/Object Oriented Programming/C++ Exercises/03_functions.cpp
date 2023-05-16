#include <iostream>
#include <cmath>
#include <limits>
#include <windows.h>

using namespace std;

// defining a class called power
class Power {
    private:                                                // creating private variables
        int n;
        int p = 2;
    public:
        Power(int num, int power):n(num),p(power){}        // constructor list to initialize variables

        double power() {                                   // function to find a number to its power
            return pow(n,p);
        }
};

void zeroSmaller(int* num1, int* num2);                     // function prototype

int main() {
    // creating variables needed for the program
    char choice;
    int num, power, num1, num2;
    bool end = false;

    // performing an operation before looping 
    do {
        system("cls");
        cout<<"\t\tFinding the powers of a Number"<<endl;
        // ask for user input
        cout<<"Enter the number: ";
        cin>>num;

        // check if number is valid
        while(cin.fail()) {
            cout<<"Invalid number! Please enter a valid integer: ";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cin>>num;
        }

        cout<<"Enter the power: ";
        cin>>power;

        // check if the power is valid input
        while(cin.fail()) {
            cout<<"Invalid number! Please enter a valid power: ";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cin>>power;
        }

        Power calc(num, power);                                                     // creating an object of the power class
        cout<<num<<" to the power of "<<power<<" = "<<calc.power()<<endl<<endl;

        cout<<"Do you want to check the power of another number? (y/n)\n";          // asking to perform an iteration
        cin>>choice;

        if(choice == 'n'){
            end = true;
        }

    } while(end!=true);

    system("cls");
    cout<<"Do you want to check the zeroSmaller() function? (y/n) \n";              // asking to perform another operation
    cin>>choice;
    if (choice == 'y'){
        cout<<"Enter two numbers separated by spaces: ";
        cin>>num1>>num2;
        cout<<endl;
        zeroSmaller(&num1, &num2);                                                  // calling the zeroSmaller function by passing by reference
    }

    return 0;
}

void zeroSmaller(int* num1, int* num2){
    if (*num1 > *num2){
        *num2 = 0;
        cout<<"Smaller number now equals: "<<*num2<<"\nBigger number remains: "<<*num1<<endl;
    }
    else {
        *num1 = 0;
        cout<<"Smaller number now equals: "<<*num1<<"\nBigger number remains: "<<*num2<<endl;
    }
}





