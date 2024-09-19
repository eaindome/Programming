/**
 * Scenario 1: Create a Vehicle constructor function with properties 
 * make and model. Use the prototype to add a method startEngine 
 * that logs a message with the vehicle's make and model.
*/

function Vehicle(make, model) {
    this.make = make;
    this.model = model;
}

Vehicle.prototype.startEngine = function () {
    return `The engine of the ${this.make} ${this.model} is starting...Vroom!`;
}

const car1 = new Vehicle('Ford', 'Mustang');
const car2 = new Vehicle('Toyota', 'Camry');


console.log(car1.startEngine());
console.log(car2.startEngine());