/*
Write a program to add two distances in inch-feet using structure. The values of the distances is to be taken from the user.
*/

#include <iostream>

using namespace std;

struct Distance {
    double inch, feet;
};

// function declaration of type structure
Distance addition(Distance, Distance);

int main(){
    // create and initiate variables needed
    char choice;

    // create structure variables
    Distance distance1, distance2, sum;

    // ask user for input
    cout<<"What metric do you want to use: \n"
        <<"1. Inches \n"<<"2. Feet \n"
        <<"Enter 1 or 2: ";
    cin>>choice;
    cout<<endl;

    // check user's decicsion
    if(choice == '1'){
        // ask the user for input
        cout<<"Enter the first distance: ";
        cin>>distance1.inch;
        cout<<"Enter the second distance: ";
        cin>>distance2.inch;

        // call the addition function
        sum = addition(distance1, distance2);
        cout<<"The sum of "<<distance1.inch<<" and "<<distance2.inch<<" in inches = "<<sum.inch<<endl;
    }
    else {
        // ask the user for input
        cout<<"Enter the first distance: ";
        cin>>distance1.feet;
        cout<<"Enter the second distance: ";
        cin>>distance2.feet;

        // call the addition function
        sum = addition(distance1, distance2);
        cout<<"The sum of "<<distance1.feet<<" and "<<distance2.feet<<" in feet = "<<sum.feet<<endl;
    }

    return 0;
}

// function definition
Distance addition(Distance distance1, Distance distance2){
    Distance result;

    result.inch = distance1.inch + distance2.inch;
    result.feet = distance1.feet + distance2.feet;

    return result;
}



/* SOLUTION
#include <iostream>

using namespace std;

// structure declaration
struct Distance {
    int feet;
    int inches;
};

// function to add two distances
Distance addDistances(Distance d1, Distance d2) {
    Distance result;

    result.feet = d1.feet + d2.feet;
    result.inches = d1.inches + d2.inches;

    // carry over the extra inches to feet if necessary
    if (result.inches >= 12) {
        result.feet++;
        result.inches -= 12;
    }

    return result;
}

int main() {
    // create and initialize variables
    Distance distance1, distance2, sum;

    // ask user for input
    cout << "Enter distance 1 in feet and inches: ";
    cin >> distance1.feet >> distance1.inches;

    cout << "Enter distance 2 in feet and inches: ";
    cin >> distance2.feet >> distance2.inches;

    // add the distances
    sum = addDistances(distance1, distance2);

    // display the result
    cout << "The sum of distances is: " << sum.feet << " feet " << sum.inches << " inches";

    return 0;
}

*/
