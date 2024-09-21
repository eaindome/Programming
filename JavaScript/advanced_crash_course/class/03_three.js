/**
 * Build a BankAccount class with methods to 
 * deposit and withdraw money. Create an 
 * instance and test its functionality.
 */

class BankAccount {
    constructor(amount) {
        this.amount = amount;
    }

    deposit(dep_amt) {
        this.amount = this.amount + dep_amt;
        return `Depositing this amount: ${this.amount}\n`;
    }

    withdraw(wit_amt) {
        this.amount = this.amount - wit_amt;
        return `Withdrawing this amount: ${wit_amt}\nRemaining Balance: ${this.amount}\n`;
    }
}

const account = new BankAccount(500);
console.log(`${account.deposit(500)}`);
console.log(`${account.withdraw(50)}`);