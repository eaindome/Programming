#include <iostream>
#include <limits>

using namespace std;

class Fruit {
    protected:
        int num_fruits;
    public:
        Fruit(int n): num_fruits(n){}
        virtual void printNumFruits() = 0;
        int getNumFruits(){
            return num_fruits;
        }
};

class Apples: public Fruit {
    public:
        Apples(int n): Fruit(n){}

        void printNumFruits(){
            cout<<"Number of Apples: "<<num_fruits<<endl;
        }
};

class Mangoes: public Fruit {
    public:
        Mangoes(int n): Fruit(n){}

        void printNumFruits(){
            cout<<"Number of Mangoes: "<<num_fruits<<endl;
        }
};


int main() {
    int num_apples, num_mangoes;

    cout<<"Enter number of apples: ";
    cin>>num_apples;

    while(cin.fail()){
        cout<<"Please enter a valid integer: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin>>num_apples;
    }

    cout<<"Enter number of mangoes: ";
    cin>>num_mangoes;

    while(cin.fail()){
        cout<<"Please enter a valid integer: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin>>num_mangoes;
    }

    Apples apples(num_apples);
    Mangoes mangoes(num_mangoes);

    Fruit* basket[] = {&apples, &mangoes};

    int total_num_fruits = 0;

    for(int i = 0; i < 2; i++){
        basket[i]->printNumFruits();
        total_num_fruits += basket[i]->getNumFruits();
    }

    cout<<"Total number of fruits: "<<total_num_fruits<<endl;

    return 0;
}