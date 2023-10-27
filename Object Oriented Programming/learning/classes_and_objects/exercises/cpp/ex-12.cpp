/*
Add two distances in inch-feet by creating a class named 'AddDistance'.
*/
#include <iostream>
using namespace std;

// define class
class AddDistance {
    private:
        double distance1, distance2;
    
    public:
        AddDistance(double dist1, double dist2):
        distance1(dist1), distance2(dist2) {}

        double toFeet() {
            double sum = distance1 + distance2;
            return sum * 0.083333333;
        }
};

int main() {
    // create an object of class and initialize with distances
    AddDistance distances(12.0, 6.0);

    // add distances and display ther
    cout<<"Toatl distances in feet:  "<<distances.toFeet()<<endl;

    return 0;
}