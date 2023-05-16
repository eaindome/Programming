/*
print the area of 10 squares
*/

#include <iostream>
#include <vector>

using namespace std;

class Rectangle {
    protected:
        double length, breadth;
    public:
        Rectangle(double l, double b): length(l), breadth(b){}

        void area(){
            double area = length * breadth;
            cout<<"Area = "<<area;
        }

        void perimeter(){
            double perimeter = 2*(length+breadth);
            cout<<"Perimeter = "<<perimeter<<endl<<endl;
        }
};

class Square: public Rectangle {
    private:
        double side;
    public:
        Square(double s): Rectangle(s, s){}
};


int main(){
    int numIter, option;
    double length, breadth, side;

    vector<Rectangle> rect;
    vector<Square> sqre;

    cout<<"How many areas do you want to enter: ";
    cin>>numIter;

    cout<<"Which shape do you want to find area: \n"
        <<"1. Rectangle \n"<<"2. Square \n"<<"Enter 1 or 2: ";
    cin>>option;

    switch(option){
        case 1: {
            for(int i =0; i < numIter; i++){
                cout<<"Enter length: ";
                cin>>length;
                cout<<"Enter Breadth: ";
                cin>>breadth;

                Rectangle rectangle(length, breadth);

                rect.push_back(rectangle);

                rect[i].area();
                cout<<endl;
                rect[i].perimeter();
            }
            break;
        }
        case 2: {
            for(int i = 0; i < numIter; i++){
                cout<<"Enter side: ";
                cin>>side;

                Square square(side);

                sqre.push_back(square);

                sqre[i].area();
                cout<<endl;
                sqre[i].perimeter();
            }
            break;
        }
        default:
            cout<<"Invalid Option!"<<endl;
            break;
    }

    return 0;
}

// Square sqre[10];



