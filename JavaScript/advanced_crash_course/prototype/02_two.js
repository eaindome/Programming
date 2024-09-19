/**
 * Scenario 2: Extend the Person constructor with a prototype method introduce 
 * that logs the person's full name. Create multiple instances and call the 
 * method.
 */

function Person(fName, lName) {
    this.fName = fName;
    this.lName = lName;
}

Person.prototype.introduce = function () {
    return `Hello, my name is ${this.fName} ${this.lName}. Nice to meet you!`;
}

const person1 = new Person('Ekow', 'Indome');

console.log(person1.introduce());