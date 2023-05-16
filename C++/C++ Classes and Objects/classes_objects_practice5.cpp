/*
Write a program to print the area of a rectangle by creating a 
class named 'Area' having two functions. First function named 
as 'setDim' takes the length and breadth of the rectangle as 
parameters and the second function named as 'getArea' returns 
the area of the rectangle. Length and breadth of the rectangle 
are entered through keyboard.
*/

#include <iostream>
#include <vector>

using namespace std;

class Area {
    private:
        double length, breadth;
    
    public:
        void setDim(double l, double b){
            length = l;
            breadth = b;
        }

        double getArea() {
            return length * breadth;
        }
};


int main() {
    vector<Area> area;
    int area_num;
    double length, breadth;

    cout<<"How many rectangle areas are you looking for: ";
    cin>>area_num;

    for(int i = 0; i < area_num; i++){
        cout<<"Enter length: ";
        cin>>length;
        cout<<"Enter breadth: ";
        cin>>breadth;

        Area rect;
        rect.setDim(length, breadth);

        area.push_back(rect);
    }

    for (int j = 0; j < area.size(); j++){
        cout<<"Area of rect "<<j+1<<" = "<<area[j].getArea()<<endl;
    }

    return 0;
}


/*
Solution:
#include <iostream>

using namespace std;

class Area {
    private:
        double length, breadth;
    
    public:
        void setDim(double l, double b){
            length = l;
            breadth = b;
        }

        double getArea() {
            return length * breadth;
        }
};

int main() {
    double length, breadth;
    Area rect;

    cout<<"Enter length: ";
    cin>>length;

    cout<<"Enter breadth: ";
    cin>>breadth;

    rect.setDim(length, breadth);
    cout<<"Area of rectangle = "<<rect.getArea()<<endl;

    return 0;
}

*/

