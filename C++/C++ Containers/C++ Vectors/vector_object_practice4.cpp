/*
Write a program to create a directory that contains the following information.
(a) Name of a person
(b) Address
(c) Telephone Number (if available with STD code)
(d) Mobile Number (if available)
(e) Head of the family
*/
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Directory {
    private:
        string name, address, telNum, mobileNum, HOF;
    public:
        Directory(string n, string a, string t, string m, string h):
            name(n), address(a), telNum(t), mobileNum(m), HOF(h){}
        
        string getName(){return name;}
        string getAddress(){return address;}
        string getTelNum(){return telNum;}
        string getMobile(){return mobileNum;}
        string getHOF(){return HOF;}
};

int main(){
    int numInfo;
    string name, address, telNum, mobileNum, HOF;

    vector<Directory> direct;

    cout<<"Enter the number of Information to enter: ";
    cin>>numInfo;

    for(int i = 0; i < numInfo; i++){
        cout<<"Entering Information: \n";
        cout<<"Enter name; ";
        getline(cin, name);
        cout<<"Enter address: ";
        getline(cin, address);
        cout<<"Enter Telephone Number: ";
        getline(cin, telNum);
        cout<<"Enter Mobile Number: ";
        getline(cin, mobileNum);
        cout<<"Enter Head of the Family: ";
        getline(cin, HOF);

        Directory Info(name, address, telNum, mobileNum, HOF);

        direct.push_back(Info);
    }
    cout<<endl<<endl;
    cout<<"\tDisplaying Information Entered"<<endl;

    for(int i = 0; i < direct.size(); i++){
        cout<<"Name: "<<direct[i].getName()<<endl;
        cout<<"Address: "<<direct[i].getAddress()<<endl;
        cout<<"Telephone Number: "<<direct[i].getTelNum()<<endl;
        cout<<"Mobile Number: "<<direct[i].getMobile()<<endl;
        cout<<"Head of the Family: "<<direct[i].getHOF()<<endl;
    }

    return 0;
}










