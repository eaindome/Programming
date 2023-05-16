/*
Write a program to find out the greatest and the smallest among three numbers using pointers.
*/
#include <iostream>

using namespace std;

void highest_smallest(int*, int*, int*);

int main(){
    int num1, num2, num3;

    cout<<"Enter 3 numbers separated by spaces: ";
    cin>>num1>>num2>>num3;

    highest_smallest(&num1,&num2,&num3);

    return 0;
}

void highest_smallest(int* num1, int* num2, int* num3){
    int highest, smallest;
    if(*num1 > *num2 && *num1 > *num3){
        highest = *num1;
        if(*num2 > *num3){
            smallest = *num3;
        }
        else{
            smallest = *num2;
        }
    }
    else if(*num2>*num1 && *num2 >*num3){
        highest = *num2;
        if(*num1 > *num3){
            smallest = *num3;
        }
        else{
            smallest = *num1;
        }
    }
    else{
        highest = *num3;
        if(*num1 > *num2){
            smallest = *num2;
        }
        else{
            smallest = *num1;
        }
    }
    cout<<"Highest number = "<<highest<<endl;
    cout<<"Smallest number = "<<smallest<<endl;
}


/*
A very nice solution:
#include <iostream>

using namespace std;

void findGreatestAndSmallest(int*, int*, int*);

int main() {
    int num1, num2, num3;

    cout << "Enter 3 numbers separated by spaces: ";
    cin >> num1 >> num2 >> num3;

    int* ptr1 = &num1;
    int* ptr2 = &num2;
    int* ptr3 = &num3;

    findGreatestAndSmallest(ptr1, ptr2, ptr3);

    return 0;
}

void findGreatestAndSmallest(int* ptr1, int* ptr2, int* ptr3) {
    int greatest = *ptr1;
    int smallest = *ptr1;

    if (*ptr2 > greatest) {
        greatest = *ptr2;
    }
    if (*ptr3 > greatest) {
        greatest = *ptr3;
    }
    if (*ptr2 < smallest) {
        smallest = *ptr2;
    }
    if (*ptr3 < smallest) {
        smallest = *ptr3;
    }

    cout << "The greatest number is: " << greatest << endl;
    cout << "The smallest number is: " << smallest << endl;
}
*/





