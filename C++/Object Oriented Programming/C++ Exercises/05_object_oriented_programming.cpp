#include <iostream>
#include <windows.h>

using namespace std;

class tollBooth {
    private:
        unsigned int num_cars;
        double amt_money;
    public:
        tollBooth(): num_cars(0), amt_money(0.0){}

        void payingCar(){
            ++num_cars;
            amt_money += 0.50;
        }

        void nopayCar(){
            ++num_cars;
        }

        const void display(){
            cout<<"Total Number of Cars = "<<num_cars<<endl;
            cout<<"Total Amount of Money = "<<amt_money<<endl;
        }
};

int main() {
    string choice, again;
    tollBooth booth;

    bool end = false;

    do {
        system("cls");
        cout<<"What do you want to do? \n"
            <<"1. Enter a paying car \n"
            <<"2. Enter a non-paying car \n"
            <<"Enter 1 or 2: ";
        cin>>choice;

        while(choice != "1" && choice != "2"){
            cout<<"Invalid choice! Please enter either 1 or 2: ";
            cin>>choice;
        }

        if (choice == "1"){
            booth.payingCar();
        }
        else {
            booth.nopayCar();
        }

        cout<<endl<<"Again? (y/n): ";
        cin>>again;

        if(again == "n"){
            end = true;
        }

    } while(end != true);

    cout<<"Do you want to display total information: (y/n) \n";
    cin>>choice;

    if(choice == "y"){
        system("cls");
        cout<<"\t\tDisplaying Total Information"<<endl;
        booth.display();
    }

    return 0;
}

























