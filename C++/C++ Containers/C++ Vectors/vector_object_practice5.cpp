/*
Lets create a bank account. Create a class named 'BankAccount' with the following data members
1 - Name of depositor
2 - Address of depositor
3 - Type of account
4 - Balance in account
5 - Number of transactions
Class 'BankAccount' has a function for each of the following
1 - Generate a unique account number for each depositor
For the first depositor, account number will be BA1000, for the second depositor it will be BA1001 and so on
2 - Display information and balance of depositor
3 - Deposit more amount in the balance of any depositor
4 - Withdraw some amount from the balance deposited
5 - Change the address of depositor
After creating the class, do the following operations
1 - Enter the information (name, address, type of account, balance) of the depositors. Number of depositors are to be entered by the user.
2 - Print the information of any depositor.
3 - Add some amount to the account of any depositor and then display the final information of that depositor
4 - Remove some amount from the account of any depositor and then display the final information of that depositor
5 - Change the address of any depositor and then display the final information of that depositor
6 - Randomly repeat these processes for some other bank accounts and after that print the total number of transactions.
*/


#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

class BankAccount {
    private:
        string name, address, type;
        double balance;
        int numTransactions;
        unsigned long int accountNumber;
        static unsigned long int nextAccountNumber;
    public:
        BankAccount(string n, string a, string t, double b, int nT): 
        name(n), address(a), type(t), balance(b), numTransactions(nT){
                accountNumber = nextAccountNumber++;
        }

        string getName(){return name;}
        string getAddress(){return address;}
        string getType(){return type;}

        double getBalance(){return balance;}

        int getNumTransactions(){return numTransactions;}
        
        unsigned long int getAccountNumber(){return accountNumber;}

        void display(vector<BankAccount>& user, int num, unsigned long int accoutNumber){
                cout<<"\tDisplaying Information\n";
                for(int i = 0; i < num; i++){
                    cout<<"Name: "<<user[i].getName()<<endl;
                    cout<<"Address: "<<user[i].getAddress()<<endl;
                    cout<<"Account Type: "<<user[i].getType()<<endl;
                    cout<<"Balance: "<<user[i].getBalance()<<endl;
                    cout<<"Number of Transactions: "<<user[i].getNumTransactions()<<endl<<endl;
                }        
        }

        
        void deposit(double amount){
            balance += amount;
            numTransactions++;
            cout<<"Deposited "<<fixed<<setprecision(2)<<amount<<" successfully!"<<endl;
        }

        void Deposit(vector<BankAccount>& user, int num, unsigned long int accountNumber, double amount){
                for(int i = 0; i < num; i++){
                    if(user[i].getAccountNumber() == accountNumber){
                        user[i].deposit(amount);
                        display(user, num, accountNumber);
                    }
                }
        }

        void withdraw(double amount){
                if(amount > balance){
                    cout<<"Sorry, insufficient funds in your account!"<<endl;
                }
                else{
                    balance -= amount;
                    numTransactions++;
                    cout<<"Withdrawn "<<fixed<<setprecision(2)<<amount<<" successfully!"<<endl;
                }
        }

        void Withdraw(vector<BankAccount>& user, int num, unsigned long int accountNumber, double amount){
            for(int i = 0; i < num; i++){
                if(user[i].getAccountNumber() == accountNumber){
                    user[i].withdraw(amount);
                    display(user, num, accountNumber);
                }
            }
        }

        void changeAddress(string newAddress){
                address = newAddress;
                cout<<"Address changed successfully!"<<endl;
        }

        void newAddress(vector<BankAccount>& user, int num, unsigned long int accountNumber, string newAddress){
            for(int i =0; i < num; i++){
                if(user[i].getAccountNumber() == accountNumber){
                    user[i].changeAddress(newAddress);
                    display(user, num, accountNumber);
                }
            }
        }
};

unsigned long int BankAccount::nextAccountNumber = 1000;

int main(){
    int numUsers;
    string name, address, type;
    double balance;
    unsigned long int accountNumber;

    vector<BankAccount> User;

    cout<<"How many User Account do you want to create: ";
    cin>>numUsers;

    cout<<"\t\tOpen Account\n";
    for(int i = 0; i < numUsers; i++){
        cout<<"Opening Account "<<i+1<<endl;
        cout<<"Name: ";
        cin.ignore();
        getline(cin, name);
        cout<<"Address: ";
        cin.ignore();
        getline(cin, address);
        cout<<"Type (Savings or Investment): ";
        cin.ignore();
        getline(cin, type);
        cout<<"Initial Balance: ";
        cin>>balance;

        BankAccount account(name, address, type, balance, 0);

        User.push_back(account);

        cout<<"\nAccount created successfully!\n";
        cout<<"Account Number: BA"<<setw(4)<<setfill('0')<<account.getAccountNumber()<<endl<<endl;
    }

    return 0;
}

