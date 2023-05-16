#include <iostream>

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
    Apples apples(10);
    Mangoes mangoes(5);

    Fruit* basket[] = {&apples, &mangoes};

    int total_num_fruits = 0;

    for(int i = 0; i < 2; i++){
        basket[i]->printNumFruits();
        total_num_fruits += basket[i]->getNumFruits();
    }

    cout<<"Total number of fruits: "<<total_num_fruits<<endl;

    return 0;
}




