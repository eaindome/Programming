/**
 * Scenario 2: Extend the Vehicle constructor 
 * to create a Car constructor, which inherits 
 * from Vehicle and adds a property numDoors. 
 * Override the startEngine method in Car.
 */

function Vehicle(make, model) {
    this.make = make;
    this.model = model;
}

Vehicle.prototype.startEngine = function () {
    return `The engine of the ${this.make} ${this.model} is starting...Vroom!`;
}

function Car(make, model, numDoors) {
    Vehicle.call(this, make, model);    // inherit properties of vehicle
    this.numDoors = numDoors;
}

Car.prototype = Object.create(Vehicle.prototype);    // inherit methods from vehicle

// correct the constructor pointer
Car.prototype.constructor = Car;

Car.prototype.startEngine = function() {
    return `The ${this.numDoors}-door ${this.make} ${this.model} is starting its engine...Vroom!`;
}

// testing the car constructor and method overriding
const car1 = new Car('Toyota', 'Camry', 4);
console.log(car1.startEngine());