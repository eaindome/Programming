/**
 * Scenario 4: Use the Function.prototype.bind 
 * method to create a new function 
 * that has its this keyword permanently 
 * bound to a specific object.
 */

const person = {
    name: 'Ekow',
    age: 23,
    introduce: function() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
};

// bind the introduce function to always refer to the person object
const boundIntroduce = person.introduce.bind(person);

// call the bound function
console.log(boundIntroduce());

const introduceFunction = person.introduce;

console.log(introduceFunction());   // without binding `this` is undefined
console.log(boundIntroduce());      // with binding, `this` refers to `person`

/*
Explanation:
The person object: 
    This is the object that contains the name 
    and age properties.

The introduce function: 
    This function uses this to refer to the 
    properties of the person object.

Using bind(): 
    The introduce method is bound to the 
    person object using person.introduce.bind(person). This permanently binds this inside introduce to the person object.


How bind() works:
Once you bind a function to a specific object, calling that function will always reference the bound object, even if it's called outside its original context.
*/