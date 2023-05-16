#include <iostream>

using namespace std;

class Vehicle {
    protected:
        double mileage, price;
    public:
        Vehicle(double m, double p): mileage(m), price(p){}

        double getMileage(){return mileage;}

        double getPrice(){return price;}
};

class Car: public Vehicle {
    protected:
        double ownership_cost;
        int warranty, seat_capacity;
        string fuel_type;
    public:
        Car(double m, double p, double oc, int w, int sc, string ft): Vehicle(m, p),
            ownership_cost(oc), warranty(w), seat_capacity(sc), fuel_type(ft){}

        double getOwnershipCost(){return ownership_cost;}

        int getWarranty(){return warranty;}  

        int getSeatCapacity(){return seat_capacity;}

        string getFuelType(){return fuel_type;}
};

class Bike: public Vehicle {
    protected:
        int num_cylinder, num_gears;
        string cooling_type, wheel_type;
        double fuel_tank_size;
    public:
        Bike(double m, double p, int nc, int ng, string ct, string wt, double fts): Vehicle(m, p),
            num_cylinder(nc), num_gears(ng), cooling_type(ct),
            wheel_type(wt), fuel_tank_size(fts){}

        int getNumCylinder(){return num_cylinder;}
        int getNumGears(){return num_gears;}

        string getCoolingType(){return cooling_type;}
        string getWheelType(){return wheel_type;}

        double getFuelTankSize(){return fuel_tank_size;}
};

class Audi: public Car {
    protected:
        string model_type;
    public:
        Audi(double m, double p, double oc, int y, int sc, string ft, string mt): Car(m, p, oc, y, sc, ft), model_type(mt){}

        string getModelType(){return model_type;}
};

class Ford: public Car {
    protected:
        string model_type;
    public:
        Ford(double m, double p, double oc, int y, int sc, string ft, string mt): Car(m, p, oc, y, sc, ft), model_type(mt){}

        string getModelType(){return model_type;}
};

class Bajaj: public Bike {
    protected:
        string make_type;
    public:
        Bajaj(double m, double p, int nc, int ng, string ct, string wt, double fts, string mt): Bike(m, p, nc, ng, ct, wt, fts), make_type(mt) {}

        string getMakeType(){return make_type;}
        
};

class TVS: public Bike {
    protected:
        string make_type;
    public:
        TVS(double m, double p, int nc, int ng, string ct, string wt, double fts, string mt): Bike(m, p, nc, ng, ct, wt, fts), make_type(mt) {} 

        string getMakeType(){return make_type;}       
};