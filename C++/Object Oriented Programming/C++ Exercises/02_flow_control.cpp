#include <iostream>
#include <string>
#include <limits>
#include <windows.h>

using namespace std;

// defining Temperature class
class Temperature {
    private:
        double Fah, Cel;                            // initializign fah and cel variables to private
    public:
        double getFah() {                           // function to get fahrenheit value
            return Fah;
        }

        double getCel() {                           // function to get celsius value
            return Cel;
        }

        void setFah(double num){                    // function to set fah value to a number
            Fah = num;
        }

        void setCel(double num){                    // functionvto set cel value to a number
            Cel = num;
        }

        double convert_to_Fahrenheit(){             // function to convert from celsius to fahrenheit
            Fah = (Cel * (9.0/5.0)) + 32.0;
            return Fah;
        }

        double convert_to_Celsius(){                // function to convert from fahrenheit to celsius
            Cel = (5.0/9.0) * (Fah-32.0);
            return Cel;
        }
};

// defining calculator class
class Calculator {
    private:
        float num1, num2;                           // initializing num1 and num2 to private variables
    public:
        float getNum1(){                            // function to get value of num1
            return num1;
        }
        float getNum2(){                            // function to get value of num2
            return num2;
        }
        void setNum1(float num){                    // function to set num1 to a number
            num1 = num;
        }
        void setNum2(float num){                    // function to set num2 to a number
            num2 = num;
        }

        float sum(){                                // function for summation
            return num1 + num2;
        }

        float diff() {                              // function for subtraction
            return num1 - num2;
        }

        float prod() {                              // function for multiplication
            return num1 * num2;
        }

        float div(){                                // function for division
            return num1 / num2;
        }
};

int main() {
    // creating variables for program;
    int option1, option2;
    char dec, oper;
    string choice;
    double num, celsius, fahrenheit;
    float num1, num2, sum, diff, prod, div;

    // creating a means to loop
    bool end = false;

    system("cls");
    // asking for user input
    cout<<"What operation do you want to perform: \n"
        <<"1. Conversion between Fahrenheit and Celsius \n"
        <<"2. Basic Calculation \n"
        <<"Enter 1 or 2: ";
    cin>>option1;

    // performing program based on user input
    switch(option1){
        case 1: {
            // creating an object 'conversion' of Temperature class
            Temperature conversion;

            // performing an operation first before looping
            do {
                system("cls");
                // asking for user input
                cout<<"What conversion do you want to perform? \n"
                <<"1. Fahrenheit to Celsius \n"
                <<"2. Celsius to Fahrenheit \n"
                <<"Enter 1 or 2: ";
                cin>>choice;

                // check if choice is valid
                while(choice != "1" && choice != "2"){
                    cout<<"Invalid choice. Please enter 1 or 2: ";
                    cin>>choice;
                }

                system("cls");
                // asking for user input
                cout<<"Enter the number to convert: ";
                cin>>num;

                // check if num is valid
                while (cin.fail()){
                    cout<<"Invalid number. Please enter a valid number: ";
                    cin.clear();
                    cin.ignore(numeric_limits<streamsize>::max(), '\n');
                    cin>>num;
                }

                //system("cls");
                // performing an operation based on users decision
                if(choice == "1") {
                    conversion.setFah(num);
                    celsius = conversion.convert_to_Celsius();
                    cout<<num<<" fahrenheit = "<<celsius<<" celsius"<<endl;
                }
                else if(choice == "2"){
                    conversion.setCel(num);
                    fahrenheit = conversion.convert_to_Fahrenheit();
                    cout<<num<<" celsius = "<<fahrenheit<<" fahrenheit"<<endl;
                }
                else{
                    cout<<"Invalid choice!."<<endl;
                }

                // cheecking to see if user wants to continue
                cout<<"\nDo you want to convert again: (y/n)\n";
                cin>>dec;
                if(dec == 'n'){
                    end = true;
                }
            } while (end != true);
            break;
        }

        case 2: {
            // creating an object 'calculate' of Calculator class
            Calculator calculate;

            // perform an operation before looping
            do {
                system("cls");
                cout<<"What operation do you want to perform: \n"
                    <<"1. + \n"
                    <<"2. - \n"
                    <<"3. * \n"
                    <<"4. / \n"
                    <<"Enter the operand of choice: ";
                cin>>oper;

                // check if oper is valid
                while (oper != '+' && oper != '-' && oper != '*' && oper != '/'){
                    cout<<"Invalid operand. Please enter +, -, *, or /: ";
                    cin>>oper;
                }

                system("cls");
                cout<<"Enter first number: ";
                cin>>num1;

                // check if num1 is valid
                while(cin.fail()){
                    cout<<"Invalid number. Please enter a valid number: ";
                    cin.clear();
                    cin.ignore(numeric_limits<streamsize>::max(), '\n');
                    cin>>num1;
                }
                cout<<"Enter the second number: ";
                cin>>num2;

                // check if num2 is valid
                while(cin.fail()){
                    cout<<"Invalid number. Please enter a valid number: ";
                    cin.clear();
                    cin.ignore(numeric_limits<streamsize>::max(), '\n');
                    cin>>num2;
                }

                //system("cls");
                // based on operand choosen perform an operation
                switch (oper)
                {
                case '+': {
                    calculate.setNum1(num1);
                    calculate.setNum2(num2);
                    sum = calculate.sum();
                    cout<<num1<<oper<<num2<<" = "<<sum<<endl;
                    break;
                }
                case '-': {
                    calculate.setNum1(num1);
                    calculate.setNum2(num2);
                    diff = calculate.diff();
                    cout<<num1<<oper<<num2<<" = "<<diff<<endl;
                    break;
                }
                case '*': {
                    calculate.setNum1(num1);
                    calculate.setNum2(num2);
                    prod = calculate.prod();
                    cout<<num1<<oper<<num2<<" = "<<prod<<endl;
                    break;
                }
                case '/': {
                    calculate.setNum1(num1);
                    calculate.setNum2(num2);
                    div = calculate.div();
                    cout<<num1<<oper<<num2<<" = "<<div<<endl;
                    break;
                }
                default:
                    cout<<"Invalid option!"<<endl;
                    break;
                }

                cout<<"\nDo you want to perform another operation? (y/n)\n";
                cin>>dec;
                if(dec == 'n'){
                    end = true;
                }
            } while(end != true);

            break;
        }

        // set default to invalid option
        default:
            cout<<"Invalid option!"<<endl;
            break;
    }

    return 0;
}

/*
do {
        cout<<"What operation do you want to perform: \n"
            <<"1. Addition \n"
            <<"2. Subtraction \n"
            <<"3. Multiplication \n"
            <<"4. Division \n"
            <"Enter the number of choice: ";
        cin>>option2;

        cout<<"Enter first number: ";
        cin>>num1;
        cout<<"Enter the second number: ";
        cin>>num2;

        switch (option1)
        {
        case 1:
            calculat
            break;
        
        default:
            break;
        }

    } while(end != true);
*/

