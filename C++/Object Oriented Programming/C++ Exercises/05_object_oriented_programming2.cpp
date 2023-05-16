#include <iostream>
#include <conio.h>    // for _getch() function

using namespace std;

class tollBooth {
    private:
        unsigned int totalCars;
        double totalCash;
    public:
        tollBooth(): totalCars(0), totalCash(0.0){}

        void payingCar(){
            totalCars++;
            totalCash += 0.50;
        }

        void nopayCar() {
            totalCars++;
        }

        void display() const {
            cout<<"Total cars: "<<totalCars<<endl;
            cout<<"Total cash: "<<totalCash<<endl;
        }
};

int main() {
    tollBooth tb;
    char key;

    cout<<"Press 'p' to count a paying car"<<endl;
    cout<<"Press 'n' to count a nonpaying car"<<endl;
    cout<<"Press 'Esc' to exit and display totals"<<endl;

    do {
        key = _getch();

        switch(key){
            case 'p':
                tb.payingCar();
                break;
            case 'n':
                tb.nopayCar();
                break;
        }
    } while(key != 27); // 27 is the ASCII code for 'Esc

    tb.display();

    return 0;
}








