// log a statement using console.log()
console.log('Hello World!');

/**
 * VARIABLES
 * 1. let - values for let variables can be re-assigned
 * 2. const - all const declarations must be initialized, and once initialized, can't be reassigned
*/
let age = 25;
// console.log(`Age: ${age}\n`);

const salary = 1200
// console.log(`Salary: ${salary}`);


/**
 * DATA TYPES
 * Primitive DT
 *  1. String
 *  2. Number
 *  3. Boolean
 *  4. Undefined 
 *  5. Null
 *  6. Bigint
 *  7. Symbol
 * 
 * Non-Primitive DT
 *  1. Object
*/

// String
const name = "Ekow";
const language = "JavaScript";
const channel = `codevolution`;

// Number
const total = 0;
const PI = 3.14;

// Boolean
const isPrimaryNumber = true;
const isNewUser= false;

// Undefined
let result
// console.log(result);

const res = undefined;
// console.log(res);

// Null
const data = null;
const res2 = null;


// Non-Primitive
const person = {
    firstName: 'Bruce',
    lastName: 'Wayne',
    alias: 'The Batman',
    age: 30,
    afilliation: 'The Justice League of America'
};

// console.log(`Name: ${person.firstName} ${person.lastName}.\nAlias: ${person.alias}.\nAge: ${person.age}.\nAffliation: ${person.afilliation}`);

// Arrays
const oddNumbers = [1, 3, 5, 7, 9];
// console.log(oddNumbers[0]);

// OPERATORS
// 1. Assignment Operators -> '='
let x = 10;
let y = 2;

// 2. Arithmetic Operators
/*
console.log(x + y);
console.log(x * y);
console.log(x - y);
console.log(x / y);
console.log(x % y);
console.log(++x);
console.log(--y);
*/

// 3. Comparison Operators
/*
console.log(x == y);
console.log(x != y);
console.log(x === y);
console.log(x !== y);
console.log(x > y);
console.log(x >= y);
console.log(x < y);
console.log(x <= y);
*/

// 4. Logical Operators
let isValidNumber;
isValidNumber = x > 8 && 8 > y;
// console.log(`isValidNumber: ${isValidNumber}`);
isValidNumber = x > 8 || 8 > y;
// console.log(`isValidNumber: ${isValidNumber}`);

// console.log(`{is New User ${!isNewUser}`);
// console.log(`is Primary Number: ${!isPrimaryNumber}`);

// 5. String Operators
console.log('Bruce ' + 'Wayne');        // addition with numbers, concatenation with strings

// 6. Other Operators
const isEven = 10 % 2 === 0 ? true : false;     // tenary operators
// console.log(`is Even number: ${isEven}`);

