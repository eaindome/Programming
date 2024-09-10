/**
 * NESTED FUNCTION'S SCOPE
 * 
*/
// let a = 10;                     // global scope
// function outer () {         // outer function scope
//     let b = 20;                 // function based scope
//     function inner() {      // inner function scope
//         let c = 30;
//         console.log(a, b, c);   // nested function scope
//     }
//     inner();
// }
// outer()

/**
 * CLOSURES
 *    - the combination of a function bundled together with references to its surrounding state
 *    - created every time a function is created i.e. at function creation time
 * 
 *    * Other definition
 *      - when we return a function from another function, we are 
 *        effectively returning a combination of the function definition along with the function's scope.
 *        This would let the function definition have an associated persisten memory which could hold on 
 *        to live data between executions. That combination of the functino and its scope chain is what is
 *        called a closuer in JavaScript.
// */
// function outer() {
//     let counter = 0;
//     function inner() {
//         counter++;
//         // console.log(`counter: ${counter}`);
//     }
//     return inner;
// }
// const fun = outer();
// fun();
// fun();
 

/**
 * CURRYING
 *     - a process in functional programming in which we transform a function
 *      with multiple arguments into a sequence of nesting functions that take one arguments at a time.
 *      function f(a, b, c) => f(a)(b)(c)
*/
function sum(a, b, c) {
    return a + b + c
}
// console.log(`sum: ${sum(2, 3, 5)}`);

// sum(2, 3, 5) => sum(2)(3)(5)

function curry(func) {
    return function(a) {
        return function(b) {
            return function(c) {
                return func(a, b, c);
            }
        }
    }
}

const curriedSum = curry(sum)
// console.log(`curriedSum: ${curriedSum(2)(3)(5)}`);

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
// console.log(`
//     add2: ${add2}\n
//     add3: ${add3}\n
//     add5: ${add5}
// `);


/**
 * THIS KEYWORD
 *    - 'this' keyword is used in a fuction, refers to the object it belongs to
 *    - makes functions reusable by letting you decide the object value
 *    - value is determined entirely by how a function is called
 * 
 *    * How to determine 'this'?
 *      - Implicit binding
 *      - Explicit binding
 *      - New binding
 *      - Default binding
*/
function sayMyName(name) {
    console.log(`My name is ${name}`);
}
sayMyName('Heisenberg');

// Implicit binding
const person = {
    name: 'Ekow',
    sayName: function() {
        console.log('Implicit binding:')
        console.log(`My name is ${this.name}`);
    }
}
person.sayName();           // this refers to the constructor 'person'


// Explicit binding
function mentionName() {
    console.log(`My name is ${this.name}`);
}
mentionName.call(person);


// New Binding
function Person(name) {
    // this = {}
    this.name = name;
}
const p1 = new Person('Ekow');
const p2 = new Person('Annan');
const p3 = new Person('Indome');
console.log(`My name is ${p1} ${p2} ${p3}`);


// Default Binding
globalThis.name = 'Paakow';
mentionName();

/** { Order of precedence
 *      - New binding
 *      - Explicit binding
 *      - Implicit binding
 *      - Default binding
} */

/**
 * PROTOTYPE
*/



/**
 * PROTOTYPEAL INHERITANCE
*/



/** 
 * CLASS 
*/



/**
 * ITERABLES AND ITERATORS
*/



/**
 * GENERATORS
*/