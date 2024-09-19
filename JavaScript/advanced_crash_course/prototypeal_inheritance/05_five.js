/**
 * Scenario 5: Create an Employee constructor and a Manager 
 * constructor that inherits from Employee. Add a method to 
 * Manager that logs how many employees they supervise.
 */

function Employee(name) {
    this.name = name;
}

function Manager(name, field, numEmployees) {
    Employee.call(this, name);
    this.field = field;
    this.numEmployees = numEmployees;
}

Manager.prototype = Object.create(Employee.prototype);

Manager.prototype.constructor = Manager;

Manager.prototype.superviseEmployees = function() {
    return `${this.name}, the ${this.field} Manager has ${this.numEmployees} employees under her wing.`;
}

const manager1 = new Manager('Kay24', 'HR', 10);
console.log(manager1.superviseEmployees());