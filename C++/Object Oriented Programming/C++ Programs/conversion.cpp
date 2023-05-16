/*
Write a C++ Program to convert inches to feet yards and inches. 
Here’s simple Program to convert inches to feet yards and inches in C++ Programming Language.
*/


#include <iostream>

using namespace std;

int main() {
    // create and initialize variables
    double inches, feet, yards;
    int choice;
    char dec;

    // Conversions 
    // inches to feet
    const double inches_feet = 12;

    // inches to yards
    const double inches_yards = 36;

    // feet to yards
    const double feet_yards = 3;

    // set limit
    bool end = false;

    while(!end){
        // ask user input
        cout<<"What do you want to convert:\n"<<"1. Inches to Feet\n"<<"2. Feet to Inches\n"<<"3. Inches to Yard\n"<<"4. Yards to Inches\n"<<"5. Feet to Yards\n"<<"6. Yards to Feet\n";
        cout<<"Enter 1,2,3,4,5 or 6: ";
        cin>>choice;
        cout<<endl<<"\tConversion"<<endl;
        switch(choice){
        case 1:
            cout<<"Enter number in inches: ";
            cin>>inches;
            cout<<inches<<" inches to Feet = "<<inches/inches_feet<<"."<<endl;
            break;
        case 2:
            cout<<"Enter number in feets: ";
            cin>>feet;
            cout<<feet<<" feet to inches = "<<feet*inches_feet<<"."<<endl;
            break;
        case 3:
            cout<<"Enter number in inches: ";
            cin>>inches;
            cout<<inches<<" inches to Yards = "<<inches/inches_yards<<"."<<endl;
            break;
        case 4:
            cout<<"Enter number in yards: ";
            cin>>yards;
            cout<<yards<<" yards to inches = "<<yards*inches_yards<<"."<<endl;
            break;
        case 5:
            cout<<"Enter number in feet: ";
            cin>>feet;
            cout<<feet<<" feet to yards = "<<feet/feet_yards<<"."<<endl;
            break;
        case 6:
            cout<<"Enter number in yards: ";
            cin>>yards;
            cout<<yards<<" yards to feet = "<<yards*feet_yards<<"."<<endl;
            break;
        default:
            cout<<"Invalid option";
            break;
        }
        cout<<endl<<"Do you want to convert again?\n"<<"Enter 'y' or 'n': ";
        cin>>dec;
        cout<<endl;
        if (dec=='n'){
            end = true;
        }
    }

    return 0;
}




