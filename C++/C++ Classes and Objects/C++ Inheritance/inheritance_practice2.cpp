/*
Make a class named Fruit with a data member to calculate the 
number of fruits in a basket. Create two other class named 
Apples and Mangoes to calculate the number of apples and 
mangoes in the basket. Print the number of fruits of each type 
and the total number of fruits in the basket.
*/

#include <iostream>
#include <vector>

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
    basket.push_back(new Apples(10));
    basket.push_back(new Mangoes(5));

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

/*
Using the normal for loop in the main() function

int main() {
    vector<Fruits*> basket;
    basket.push_back(new Apples(10));
    basket.push_back(new Mangoes(5));

    int totalNumFruits = 0;
    for(int i = 0; i < basket.size(); i++){
        basket[i] -> printNumFruits();
        totalNumFruits += basket[i]->getNumFruits();
    }
    cout<<"Total number of fruits: "<<totalNumFruits<<endl;

    // free memory
    for(int i = 0; i<basket.size(); i++){
        delete basket[i];
    }

    return 0;
}
*/


