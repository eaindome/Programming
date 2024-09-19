/**
 * Scenario 1: Create a Shape constructor with 
 * a getType prototype method. Then create a 
 * Circle constructor that inherits from Shape 
 * and adds a radius property. Call the 
 * inherited method.
 */

function Shape(type) {
    this.type = type;
}

Shape.prototype.getType = function() {
    return `Shape type: ${this.type}`;
}

function Circle(radius) {
    Shape.call(this, 'Circle'); // inherit properties from shape
    this.radius = radius;
}

// inherit methods from shape's prototype
Circle.prototype = Object.create(Shape.prototype);

// correct the constructor pointer
Circle.prototype.constructor = Circle;


// test the inheritance and prototype methods
const circle1 = new Circle(5);

console.log(circle1.getType());
console.log(`Radius: ${circle1.radius}`);
