/*
Write a C++ Program to Convert Days Into Years Weeks and Days. Here’s simple Program to Convert Days Into Years Weeks and Days in C++ Programming Language.
*/

#include <iostream>
#include <windows.h>

using namespace std;


int main() {
    // Create and initiate variables
    int option;
    double days, weeks, months, years;
    char again;
    bool end = false;

    while(!end){
        // clear console window
        system("cls");

        // ask for user input
        cout<<"\t\t\tConversion between Days, Weeks, Months and Years"<<endl;
        cout<<"Choose the conversion of preference: \n"
            <<"1. Days to Weeks \n"
            <<"2. Days to Months \n"
            <<"3. Days to Years \n"
            <<"4. Weeks to Days \n"
            <<"5. Weeks to Months \n"
            <<"6. Weeks to Years \n"
            <<"7. Months to days \n"
            <<"8. Months to weeks \n"
            <<"9. Months to years \n"
            <<"10. Years to days \n"
            <<"11. Years to weeks \n"
            <<"12. Years to months \n"
            <<"Enter the number of choice: ";
        cin>>option;
        cout<<endl;
        system("cls");
        switch(option){
            case 1:{
                cout<<"\t\tConverting from days to weeks \n";
                cout<<"Enter the number of days: ";
                cin>>days;
                weeks = days/7;
                cout<<days<<" days amount to "<<weeks<<" weeks."<<endl<<endl;
                break;
            }
            case 2:{
                cout<<"\t\tConverting from days to months \n";
                cout<<"Enter the number of days: ";
                cin>>days;
                months = days/31;
                cout<<days<<" days amount to "<<months<<" months."<<endl<<endl;
                break;
            }
            case 3:{
                cout<<"\t\tConverting from days to years \n";
                cout<<"Enter the number of days: ";
                cin>>days;
                years = days/365;
                cout<<days<<" days amount to "<<years<<" years."<<endl<<endl;
                break;
            }
            case 4:{
                cout<<"\t\tConverting from weeks to days \n";
                cout<<"Enter the number of weeks: ";
                cin>>weeks;
                days = weeks * 7;
                cout<<weeks<<" weeks amount to "<<days+2<<" days."<<endl<<endl;
                break;
            }
            case 5:{
                cout<<"\t\tConverting from weeks to months \n";
                cout<<"Enter the number of weeks: ";
                cin>>weeks;
                months = weeks/4;
                cout<<weeks<<" weeks amount to "<<months<<" months."<<endl<<endl;
                break;
            }
            case 6:{
                cout<<"\t\tConverting from weeks to years \n";
                cout<<"Enter the number of weeks: ";
                cin>>weeks;
                years = weeks/48;
                cout<<weeks<<" weeks amount to "<<years<<" years."<<endl<<endl;
                break;
            }
            case 7:{
                cout<<"\t\tConverting from month to days \n";
                cout<<"Enter the number of months: ";
                cin>>months;
                days = months * 30;
                cout<<months<<" months amount to "<<days<<" days."<<endl<<endl;
                break;
            }
            case 8:{
                cout<<"\t\tConverting from month to weeks \n";
                cout<<"Enter the number of months: ";
                cin>>months;
                weeks = months * 4;
                cout<<months<<" months amount to "<<weeks<<" weeks."<<endl<<endl;
                break;
            }
            case 9:{
                cout<<"\t\tConverting from month to years \n";
                cout<<"Enter the number of months: ";
                cin>>months;
                years = months/12;
                cout<<months<<" months amount to "<<days<<" days."<<endl<<endl;
                break;
            }
            case 10:{
                cout<<"\t\tConverting from years to days \n";
                cout<<"Enter the number of years: ";
                cin>>years;
                days = years * 365;
                cout<<years<<" years amount to "<<days<<" days."<<endl<<endl;
                break;
            }
            case 11:{
                cout<<"\t\tConverting from years to weeks \n";
                cout<<"Enter the number of years: ";
                cin>>years;
                weeks = years * 48;
                cout<<years<<" years amount to "<<weeks<<" weeks."<<endl<<endl;
                break;
            }
            case 12:{
                cout<<"\t\tConverting from years to months \n";
                cout<<"Enter the number of years: ";
                cin>>years;
                months = years * 12;
                cout<<years<<" years amount to "<<months<<" months."<<endl<<endl;
                break;
            }
            default:
                cout<<"Invalid choice!"<<endl;
                end = true;
                continue;
        }
        cout<<"Do you want to try again? \n"
            <<"1. Yes \n"<<"2. No \n"
            <<"Enter 1 or 2: ";
        cin>>again;
        if (again == '2'){
            end = true;
        }
        cout<<endl;
    }

    cout<<"Ending Program...";


    return 0;
}