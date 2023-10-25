/*
Print the average of three numbers entered by the user 
by creating a class named 'Average' having a function to calculate 
and print the average without creating any object of the Average class.
*/
#include <iostream>
using namespace std;

// define class
class Average {
    private:
        double num1, num2, num3;

    public:
        static void getAverage(
            double num1,
            double num2,
            double num3
        ) {
            cout<<"Average = "<<(num1+num2+num3)/3.0;
        }
};

int main() {
    Average::getAverage(3, 5, 4);
    return 0;
}