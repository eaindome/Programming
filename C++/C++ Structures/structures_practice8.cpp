/*
Write a structure to store the name, account number and balance of customers (more than 10) and store their information.
1 - Write a function to print the names of all the customers having balance less than $200.
2 - Write a function to add $100 in the balance of all the customers having more than $1000 in their balance and then print the incremented value of their balance.
*/

#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Customer {
    string name;
    long int account_no;
    double balance;
};

void getData(vector<Customer>&, int);
void balance200(const vector<Customer>&);
void balance1000(const vector<Customer>&);

int main(){
    // create and initialize variables needed
    int num_customers;

    // create a vector of structure variables
    vector<Customer> customer;

    // ask for no of customers
    cout<<"How many customers do you want to enter: ";
    cin>>num_customers;
    cout<<endl;

    // resize the vector to fit the number of customers entered
    customer.resize(num_customers);

    // get customer data
    getData(customer, num_customers);

    // display names of customers having balance less than $200
    balance200(customer);

    // display names of customers with $1000 plus in their accounts and increase it by $100
    balance1000(customer);

    return 0;
}

void getData(vector<Customer>& customer, int num_customers){
    for (int i = 0; i < num_customers; i++){
        // ask user for input
        // consume newline charater in the input stream
        cin.ignore();

        cout<<"Enter Full Name of Customer: ";
        getline(cin, customer[i].name);

        cout<<"Enter Account Number: ";
        cin>>customer[i].account_no;

        cout<<"Enter Balance: ";
        cin>>customer[i].balance;
        cout<<endl;
    }
}

void balance200(const vector<Customer>& customer){
    cout<<endl;
    cout<<"\t\tNames of Customers with balance less than $200"<<endl;
    cout<<"Customer Names: "<<endl;
    for(int i = 0; i < customer.size(); i++){
        if(customer[i].balance < 200){
            cout<<i+1<<". "<<customer[i].name<<endl;
        }
    }
}

void balance1000(const vector<Customer>& customer){
    Customer new_balance;
    cout<<endl;
    cout<<"\t\tCustomers with balance equal to or greater $1000"<<endl;
    for(int j = 0; j < customer.size(); j++){
        if(customer[j].balance >= 1000){
            cout<<"Customer Name: "<<customer[j].name<<endl;
            cout<<"Old balance = $"<<customer[j].balance<<"."<<endl;
            new_balance = customer[j];
            new_balance.balance += 100;
            cout<<"New balance = $"<<new_balance.balance<<"."<<endl<<endl;
        }
    }
}






// A Really Nice solution
/*
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Customer {
    string name;
    int account_no;
    double balance;
};

void printBalanceLessThan200(const vector<Customer>& customers) {
    cout << "\nCustomers with balance less than $200:\n";
    for (const auto& customer : customers) {
        if (customer.balance < 200) {
            cout << customer.name << endl;
        }
    }
}

void add100ToBalanceIf1000OrMore(vector<Customer>& customers) {
    cout << "\nCustomers with balance equal to or greater than $1000:\n";
    for (auto& customer : customers) {
        if (customer.balance >= 1000) {
            cout << "Customer Name: " << customer.name << endl;
            cout << "Old balance: $" << customer.balance << endl;
            customer.balance += 100;
            cout << "New balance: $" << customer.balance << endl << endl;
        }
    }
}

int main() {
    // create a vector of structure variables to store customer data
    vector<Customer> customers;

    // ask for the number of customers
    int num_customers;
    cout << "How many customers do you want to enter: ";
    cin >> num_customers;

    // get customer data
    customers.resize(num_customers);
    for (int i = 0; i < num_customers; i++) {
        cout << "\nCustomer " << i + 1 << ":\n";
        cin.ignore(); // consume newline character in the input stream
        cout << "Enter Full Name: ";
        getline(cin, customers[i].name);
        cout << "Enter Account Number: ";
        cin >> customers[i].account_no;
        cout << "Enter Balance: ";
        cin >> customers[i].balance;
    }

    // print the names of all the customers having balance less than $200
    printBalanceLessThan200(customers);

    // add $100 in the balance of all the customers having more than $1000 in their balance
    // and then print the incremented value of their balance
    add100ToBalanceIf1000OrMore(customers);

    return 0;
}


*/

/*
Explanation of the solution from right above
In this solution, we define a Customer structure to store the name, account number, and balance of a customer. We then define two functions: printBalanceLessThan200() and add100ToBalanceIf1000OrMore().

The printBalanceLessThan200() function takes a vector of Customer objects and prints the names of all the customers having a balance less than $200.

The add100ToBalanceIf1000OrMore() function takes a vector of Customer objects, adds $100 to the balance of all the customers having more than $1000 in their balance, and then prints the incremented value of their balance.

In the main() function, we first create an empty vector customers to store the customer data. We then ask the user to enter the number of customers they want to enter and resize the customers vector accordingly. We then get the customer data from the user using a for loop and the cin and getline functions. Finally, we call the printBalanceLessThan200() and add100ToBalanceIf1000OrMore() functions to print the desired customer data.

*/



