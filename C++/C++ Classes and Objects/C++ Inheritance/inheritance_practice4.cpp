/*
We want to store the information of different vehicles. Create a class named Vehicle with two data member named mileage and price. Create its two subclasses
*Car with data members to store ownership cost, warranty (by years), seating capacity and fuel type (diesel or petrol).
*Bike with data members to store the number of cylinders, number of gears, cooling type(air, liquid or oil), wheel type(alloys or spokes) and fuel tank size(in inches)
Make another two subclasses Audi and Ford of Car, each having a data member to store the model type. Next, make two subclasses Bajaj and TVS, each having a data member to store the make-type.
Now, store and print the information of an Audi and a Ford car (i.e. model type, ownership cost, warranty, seating capacity, fuel type, mileage and price.) Do the same for a Bajaj and a TVS bike.
*/

#include <iostream>
#include <string>

using namespace std;

class Vehicle {
    private:
        double mileage, price;
    protected:
        double getMileage(double num){
            mileage = num;
            return mileage;
        }

        double getPrice(double num){
            price = num;
            return price;
        }
    public:
        Vehicle(): mileage(), price(){}

        void setMilage(double num){
            mileage = num;
        }

        void setPrice(double num){
            price = num;
        }


};

class Car: public Vehicle {
    protected:
        double ownership_cost;
        int years, seat_capacity;
        string fuel_type;
    public:
        double getOwnershipCost(){return ownership_cost;}

        int getYears(){return years;}

        int getSeatCapacity(){return seat_capacity;}

        string getFuelType(){return fuel_type;}

        void setOwnershipCost(double num){
            ownership_cost = num;
        }

        void setYears(int num){
            years = num;
        }

        void setSeatCapacity(int num){
            seat_capacity = num;
        }

        void setFuelType(string type){
            fuel_type = type;
        }    
};

class Bike: public Vehicle {
    protected:
        int num_cylinder, num_gears;
        string cooling_type, wheel_type;
        double fuel_tank_size;
    public:
        int getNumCylinder(){return num_cylinder;}

        int getNumGears(){return num_gears;}

        double getFuelTankSize(){return fuel_tank_size;}

        string getCoolingType(){return cooling_type;};

        string getWheelType(){return wheel_type;}

        void setNumCylinder(int num){
            num_cylinder = num;
        }

        void setNumGears(int num){
            num_gears = num;
        }
};

class Audi: public Vehicle, public Car {
    protected:
        string model_type;
    public:
        string getModelType(){
            return model_type;
        }

        void setModelType(string m){
            model_type = m;
        }
};

class Ford: public Vehicle, public Car {
    protected:
        string model_type;
    public:
        string getModelType(){
            return model_type;
        }

        void setModelType(string m){
            model_type = m;
        }
};

class Bajaj: public Vehicle, public Bike {
    protected:
        string make_type;
    public:
        string getMakeType(){
            return make_type;
        }

        void setMakeType(string m){
            make_type = m;
        }
};

class TVS: public Vehicle, public Bike {
    protected:
        string make_type;
    public:
        string getMakeType(){
            return make_type;
        }

        void setMakeType(string m){
            make_type = m;
        }
};










