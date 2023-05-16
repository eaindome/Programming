/*
Write a program to compare two dates entered by user. 
Make a structure named Date to store the elements day, month and year to store the dates. If the dates are equal, display "Dates are equal" 
otherwise display "Dates are not equal".
*/
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Date {
    int day, month, year;
};

void getData(vector<Date>&, int);

int main(){
    // create and initiate variables needed
    int num_days;

    // create a vector structure variable
    vector<Date> data;

    // ask for the number of dates
    cout<<"Enter the number of dates to compare(max 2): ";
    cin>>num_days;

    // resize vector to number of days
    data.resize(num_days);

    // get date information
    getData(data, num_days);

    // checking if the dates are equal
    if (data[0].day == data[1].day){
        cout<<"Dates are equal";
    }

    return 0;
}

void getData(vector<Date>& data, int num_days){
    for(int i = 0; i < num_days; i++){
        cout<<endl<<"Enter day: ";
        cin>>data[i].day;
        cout<<"Enter month(in numbers): ";
        cin>>data[i].month;
        cout<<"Enter year: ";
        cin>>data[i].year;
    }
}







