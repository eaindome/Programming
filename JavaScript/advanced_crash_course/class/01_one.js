/**
 * Create a Student class with a constructor that takes firstName 
 * and lastName and a method that returns the student's full name.
 */

class Student {
    constructor(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }

    fullName() {
        return `My name is ${this.firstName} ${this.lastName}.`;
    }
}

const student1 = new Student('Clark', 'Kent');
console.log(student1.fullName());
