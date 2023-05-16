/*
We want to store the information of different vehicles. Create a class named Vehicle with two data member named mileage and price. Create its two subclasses
*Car with data members to store ownership cost, warranty (by years), seating capacity and fuel type (diesel or petrol).
*Bike with data members to store the number of cylinders, number of gears, cooling type(air, liquid or oil), wheel type(alloys or spokes) and fuel tank size(in inches)
Make another two subclasses Audi and Ford of Car, each having a data member to store the model type. Next, make two subclasses Bajaj and TVS, each having a data member to store the make-type.
Now, store and print the information of an Audi and a Ford car (i.e. model type, ownership cost, warranty, seating capacity, fuel type, mileage and price.) Do the same for a Bajaj and a TVS bike.
*/

#include <iostream>
#include <string>
#include <vector>
#include <limits>
#include <windows.h>
#include "vehicle_classes.h"

using namespace std;

void display_vehicle_info(vector<Ford>& fords, vector<Audi>& audi, vector<Bajaj>& bajaj, vector<TVS>& tvs);

int main(){
    char again, info;
    int warranty, seat_capacity, years, num_cylinders, num_gears;
    double mileage, price, ownership_cost, fuel_tank_size;
    string model_type, make_type, fuel_type, cooling_type, wheel_type;
    int choice, car_choice, bike_choice;

    bool end = false;

    vector<Ford> fords;
    vector<Audi> audi;
    vector<Bajaj> bajaj;
    vector<TVS> tvs;

    do {
        system("cls");
        cout<<"Which vehicle information do you want to add to: \n"
        <<"1. Cars \n"<<"2. Bikes \n"<<"Enter 1 or 2: ";
        cin>>choice;

        system("cls");
        switch(choice){
            case 1:{
                cout<<"Which Car information do you want to enter: \n"
                    <<"1. Ford \n"<<"2. Audi \n"<<"Enter 1 or 2: ";
                cin>>car_choice;

                system("cls");
                switch(car_choice){
                    case 1:{
                        cout<<"Enter the model of the car: ";
                        cin.ignore();
                        getline(cin, model_type);

                        cout<<"Enter this information as follows, you can separate with tabs: \n"
                            <<"Price\tOwnership Cost\tMileage\tWarranty\tSeat Capacity\n";
                        cin>>price>>ownership_cost>>mileage>>warranty>>seat_capacity;

                        cout<<"Further Information\n";
                        cout<<"Enter Fuel Type of the car: ";
                        cin.ignore();
                        getline(cin, fuel_type);
                        fords.push_back(Ford(mileage, price, ownership_cost, warranty, seat_capacity, fuel_type, model_type));
                        cout<<"Information Entered Successfully!"<<endl;

                        break;
                    }

                    case 2: {
                        cout<<"Enter the model of the car: ";
                        cin.ignore();
                        getline(cin, model_type);

                        cout<<"Enter this information as follows, you can separate with tabs: \n"
                            <<"Price\tOwnership Cost\tMileage\tWarranty\tSeat Capacity\n";
                        cin>>price>>ownership_cost>>mileage>>warranty>>seat_capacity;

                        cout<<"Further Information\n";
                        cout<<"Enter Fuel Type of the car: ";
                        cin.ignore();
                        getline(cin, fuel_type);

                        audi.push_back(Audi(mileage, price, ownership_cost, warranty, seat_capacity, fuel_type, model_type));
                        cout<<"Information Entered Successfully!"<<endl;

                        break;
                    }
                    default: {
                        cout<<"Invalid option!";
                        break;
                    }
                }
                break;
            }

            case 2: {
                cout<<"Which Bike information do you want to enter: \n"
                    <<"1. Bajanj \n"<<"2. TVS \n"<<"Enter 1 or 2: ";
                cin>>bike_choice;

                switch(bike_choice){
                    case 1:{
                        cout<<"Enter the make type of the car: ";
                        cin.ignore();
                        getline(cin, make_type);

                        // Bike(double m, double p, int nc, int ng, string ct, string wt, double fts): Vehicle(m, p)
                        cout<<"Enter this information as follows, you can separate with tabs: \n"
                            <<"Price\tMileage\tFuel Tank Size\tCylinder Number\tGear Number\n";
                        cin>>price>>mileage>>fuel_tank_size>>num_cylinders>>num_gears;

                        cout<<"Further Information\n";
                        cout<<"Enter Cooling Type of bike: ";
                        cin.ignore();
                        getline(cin, cooling_type);
                        cout<<"Enter Wheel Type of bike: ";
                        cin.ignore();
                        getline(cin, wheel_type);

                        // TVS(double m, double p, int nc, int ng, string ct, string wt, double fts, string mt): Bike(m, p, nc, ng, ct, wt, fts), make_type(mt) {} 
                        bajaj.push_back(Bajaj(mileage, price, num_cylinders, num_gears, cooling_type, wheel_type, fuel_tank_size, model_type));

                        break;
                    }
                    case 2: {
                        cout<<"Enter the make type of the car: ";
                        cin.ignore();
                        getline(cin, make_type);

                        cout<<"Enter this information as follows, you can separate with tabs: \n"
                            <<"Price\tMileage\tFuel Tank Size\tCylinder Number\tGear Number\n";
                        cin>>price>>mileage>>fuel_tank_size>>num_cylinders>>num_gears;

                        cout<<"Further Information\n";
                        cout<<"Enter Cooling Type of bike: ";
                        cin.ignore();
                        getline(cin, cooling_type);
                        cout<<"Enter Wheel Type of bike: ";
                        cin.ignore();
                        getline(cin, wheel_type);

                        // TVS(double m, double p, int nc, int ng, string ct, string wt, double fts, string mt): Bike(m, p, nc, ng, ct, wt, fts), make_type(mt) {} 
                        tvs.push_back(TVS(mileage, price, num_cylinders, num_gears, cooling_type, wheel_type, fuel_tank_size, model_type));

                        break;
                    }
                    default:{
                        cout<<"Invalid option!";
                        break;
                    }
                }
                break;
            }
            default:{
                cout<<"Invalid option!";
                break;
            }
        }

        cout<<"Do you want to want to add another vehicle information: (y/n)\n";
        cin>>again;
        if(again == 'n'){
            end = true;
        }
    } while(end!=true);

    end = false;

    do {
        cout<<"Do you want to Display Current Information: (y/n)\n";
        cin>>info;
        if(info == 'y'){
            display_vehicle_info(fords, audi, bajaj, tvs);
        }
        
        cout<<"Do you want to display another: (y/n)\n";
        cin>>again;
        if(again == 'n'){
            end = true;
        }
    } while(end!=true);

    cout<<"Quitting program...";
    
    return 0;
}


void display_vehicle_info(vector<Ford>& fords, vector<Audi>& audi, vector<Bajaj>& bajaj, vector<TVS>& tvs){
    int vehicle_choice;

    cout<<"Which vehilce information do you want to display: \n"
        <<"1. Ford \n"<<"2. Audi \n"<<"3. Bajaj \n"<<"4. TVS \n";
    cin>>vehicle_choice;

    switch(vehicle_choice){
        case 1: {
            if(fords.size() == 0){
                cout<<"No Fords have been entered yet.\n";
            }
            else{
                for (int i = 0; i < fords.size(); i++){
                    cout<<"Model: "<<fords[i].getModelType()<<"\n"
                        <<"Price: "<<fords[i].getPrice()<<"\n"
                        <<"Ownership Cost: "<<fords[i].getOwnershipCost()<<"\n"
                        <<"Mileage: "<<fords[i].getMileage()<<"\n"
                        <<"Warranty: "<<fords[i].getWarranty()<<"\n"
                        <<"Seat Capacity: "<<fords[i].getSeatCapacity()<<"\n"
                        <<"Fuel Type: "<<fords[i].getFuelType()<<"\n\n";
                }
            }
            break;
        }

        case 2: {
            if(audi.size() == 0){
                cout<<"No Audis have been entered yet.";
            }
            else{
                for (int i = 0; i < audi.size(); i++){
                    cout<<"Model: "<<audi[i].getModelType()<<"\n"
                        <<"Price: "<<audi[i].getPrice()<<"\n"
                        <<"Ownership Cost: "<<audi[i].getOwnershipCost()<<"\n"
                        <<"Mileage: "<<audi[i].getMileage()<<"\n"
                        <<"Warranty: "<<audi[i].getWarranty()<<"\n"
                        <<"Seat Capacity: "<<audi[i].getSeatCapacity()<<"\n"
                        <<"Fuel Type: "<<audi[i].getFuelType()<<"\n\n";
                }
            }
            break;
        }

        case 3: {
            if(bajaj.size() == 0){
                cout<<"No Bajaj have been entered yet.";
            }
            else {
                for(int i = 0; i < bajaj.size(); i++){
                    cout<<"Model: "<<bajaj[i].getMakeType()<<"\n"
                        <<"Price: "<<bajaj[i].getPrice()<<"\n"
                        <<"Number of Cylinders: "<<bajaj[i].getNumCylinder()<<"\n"
                        <<"Number of Gears: "<<bajaj[i].getNumGears()<<"\n"
                        <<"Cooling Type: "<<bajaj[i].getCoolingType()<<"\n"
                        <<"Wheel Type: "<<bajaj[i].getWheelType()<<"\n"
                        <<"Fuel Tank Size: "<<bajaj[i].getFuelTankSize()<<"\n\n";
                }
            }
            break;
        }

        case 4: {
            if(tvs.size() == 0){
                cout<<"No TVS have been entered yet.";
            }
            else {
                for(int i = 0; i < tvs.size(); i++){
                    cout<<"Model: "<<tvs[i].getMakeType()<<"\n"
                        <<"Price: "<<tvs[i].getPrice()<<"\n"
                        <<"Number of Cylinders: "<<tvs[i].getNumCylinder()<<"\n"
                        <<"Number of Gears: "<<tvs[i].getNumGears()<<"\n"
                        <<"Cooling Type: "<<tvs[i].getCoolingType()<<"\n"
                        <<"Wheel Type: "<<tvs[i].getWheelType()<<"\n"
                        <<"Fuel Tank Size: "<<tvs[i].getFuelTankSize()<<"\n\n";
                }
            }
            break;
        }

        default:{
            cout<<"Invalid Option!";
            break;
        }
    }

}
