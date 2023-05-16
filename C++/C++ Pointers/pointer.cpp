#include <iostream>


using namespace std;

int main(){
    /*
    int *ptr = 0;
    int a = 10;
    *ptr = a;
    cout<<*ptr<<endl;

    int a = 100, b = 200;
    int *p = &a, *q = &b;
    p = q;
    cout<<a<<endl<<b;*/

    int a = 7;
    int *c = &a;
    c = c+1;
    cout<<&a<<" "<<c<<endl;

    int arr[] = {4,5,6,7};
    int *p = (arr + 1);
    cout<<*arr+9;

    return 0;
}