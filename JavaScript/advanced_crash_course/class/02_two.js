/**
 * Create a Rectangle class with methods to calculate the area 
 * and perimeter. Then create a Square class that extends 
 * Rectangle.
 */

class Rectangle {
    constructor(length, width) {
        this.length= length;
        this.width= width;
    }

    area() {
        return this.length * this.width;
    }

    perimeter() {
        return 2 * (this.length + this.width);
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

// examples
const rectangle = new Rectangle(5, 4);
console.log(`Area of rectangle: ${rectangle.area()}`);
console.log(`Perimeter of rectangle: ${rectangle.perimeter()}`);

const square = new Square(4);
console.log(`Area of square: ${square.area()}`);
console.log(`Perimeter of square: ${square.perimeter()}`);