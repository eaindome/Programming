#include <iostream>
#include <vector>
#include <limits>

using namespace std;

class Fruits {
    protected:
        int num_fruits;
    public:
        Fruits(int n):num_fruits(n){}
        virtual void printNumFruits() = 0;
        int getNumFruits() const {return num_fruits;}
};

class Apples: public Fruits {
    public:
        Apples(int n): Fruits(n){}

        void printNumFruits(){
            cout<<"Number of Apples: "<<num_fruits<<endl;
        }
};

class Mangoes: public Fruits {
    public:
        Mangoes(int n):Fruits(n){}

        void printNumFruits(){
            cout<<"Number of Mangoes: "<<num_fruits<<endl;
        }
};


int main() {
    vector<Fruits*> basket;
    int num_apples, num_mangoes;

    cout<<"Enter number of apples: ";
    cin>>num_apples;

    while(cin.fail()){
        cout<<"Please enter a valid number: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin>>num_apples;
    }
    basket.push_back(new Apples(num_apples));

    cout<<"Enter number of mangoes: ";
    cin>>num_mangoes;
    while(cin.fail()){
        cout<<"Please enter a valid number: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin>>num_mangoes;
    }
    basket.push_back(new Mangoes(num_mangoes));

    /*
    basket.push_back(new Apples(10));
    basket.push_back(new Mangoes(5));*/

    int totalNumFruits = 0;
    for(auto f: basket){
        f->printNumFruits();
        totalNumFruits += f->getNumFruits();
    }
    cout<<"Total number of fruits: "<<totalNumFruits<<endl;

    // free memory
    for(auto f: basket){
        delete f;
    }

    return 0;
}