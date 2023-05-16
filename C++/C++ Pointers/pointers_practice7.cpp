/*
Write a program to find the factorial of a number using pointers.
*/
#include <iostream>

using namespace std;

// function prototype
void factorial(int* numptr, int* iternum);

int main(){
    int num, iter_num;

    cout<<"Enter a number: ";
    cin>>num;

    iter_num = num;

    factorial(&num, &iter_num);

    return 0;
}

// function definition
void factorial(int* numptr, int* iternum){
    int* start_num_ptr;
    int start_num = 1;
    for(int i = 0; i < *iternum; i++){
        start_num *= *numptr;
        //cout<<numptr;
        (*numptr)--;
    }
    start_num_ptr = &start_num;
    cout<<*start_num_ptr;
}

// factorial trial
/*
factorial trial
start_num = 1;
    for(int i = 0; i < iter_num; i++){
        start_num *= num;
        num--;
    }
*/

// minor problem
/*
Good code, but minor issue
There's still one issue in the code. The variable start_num is declared inside the factorial function and assigned the value of 1. This variable is a local variable and its scope is limited to the factorial function only. Therefore, when the function returns, this variable no longer exists and accessing it using a pointer results in undefined behavior.

To fix this, you can allocate memory dynamically using the new operator and assign the value of start_num to the allocated memory. Then, you can return the address of this memory and assign it to a pointer variable in the main function. Finally, you can print the value at the address pointed by the pointer variable.
*/

// solution 1
/*
Solution 1:
#include <iostream>

using namespace std;

// function prototype
int* factorial(int* numptr, int* iternum);

int main(){
    int num, iter_num;

    cout<<"Enter a number: ";
    cin>>num;

    iter_num = num;

    int* result = factorial(&num, &iter_num);

    cout<<"Factorial of "<<num<<" is "<<*result<<endl;

    delete result;

    return 0;
}

// function definition
int* factorial(int* numptr, int* iternum){
    int* start_num_ptr = new int(1);
    for(int i = 0; i < *iternum; i++){
        *start_num_ptr *= *numptr;
        (*numptr)--;
    }
    return start_num_ptr;
}

*/

// solution 2
/*
#include <iostream>

using namespace std;

// function prototype
void factorial(int* numptr, int* resultptr);

int main(){
    int num, result;

    cout<<"Enter a number: ";
    cin>>num;

    factorial(&num, &result);

    cout<<"Factorial of "<<num<<" is "<<result<<endl;

    return 0;
}

// function definition
void factorial(int* numptr, int* resultptr){
    int i;
    *resultptr = 1;

    for(i=1; i<=*numptr; i++){
        *resultptr *= i;
    }
}
*/

// Explanation
/*
Here, we declare a function factorial() that takes two pointers numptr and resultptr, which represent the number whose factorial is to be found, and the result of the factorial calculation, respectively.

Inside the factorial() function, we first initialize the resultptr with 1, as we'll be multiplying it with the numbers from 1 to numptr. We then loop through the numbers from 1 to numptr, and multiply resultptr with each of them.

In the main() function, we take input from the user for the number whose factorial is to be found, and then call the factorial() function by passing its address (&num) and the address of result variable (&result). Finally, we print the result of the factorial calculation.
*/

