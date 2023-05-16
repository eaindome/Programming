/*
Create a class with a function that prints "This is parent class" and its subclass with another function that prints "This is child class". Now, create an object for each class and call
1 - function of the parent class by the object of the parent class
2 - function of the child class by the object of the child class
3 - function of the parent class by the object of the child class
*/


#include <iostream>

using namespace std;

class Parent {
    public:
        void print(){
            cout<<"This is a parent class."<<endl;
        }
};

class Child: public Parent {
    public:
        void print(){
            cout<<"This is a child class."<<endl;
        }
};

int main(){
    Parent parent;
    Child child;

    parent.print();
    cout<<endl;
    child.print();
    cout<<endl;
    child.Parent::print();

    return 0;
}








