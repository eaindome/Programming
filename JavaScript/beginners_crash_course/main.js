// log a statement using console.log()
// console.log('Hello World!');

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
// console.log('Bruce ' + 'Wayne');        // addition with numbers, concatenation with strings

// 6. Other Operators
const isEven = 10 % 2 === 0 ? true : false;     // tenary operators
// console.log(`is Even number: ${isEven}`);



/**
 * TYPE CONVERSIONS
 * 1. Implicit Conversion
 * 2. Explicit Conversion
 */
// implicit conversion
/*
console.log(2 + '3');
console.log('4' - '2');
console.log('3' * '2');
console.log('Bruce' - 'Wayne'); // not a number (NaN)
console.log('5' - false);       // true = 1, false = 0
console.log('5' - null);        // null = 0
console.log('5' + undefined);   // not a number (NaN)
*/

// explicit conversion
/*
console.log(Number('5'));       // convert string to number
console.log(Number(false));     // 0
console.log(parseInt('5'));
console.log(parseFloat('3.14'));

console.log(String(500));       // convert other data types to string
console.log(String(undefined));
console.log(String(null));
console.log((500).toString());
console.log(Boolean(10));       // null, undefined, 0, '', NaN -> false
*/

// console.log(`null: ${Boolean(null)}\n
// undefined: ${Boolean(undefined)}\n
// NaN: ${Boolean(NaN)}\n`);

/**
 * EQUALITY
 * 1. == - Allows coercion
 * 2. === - Does not allow coercion
 */
const var1 = 10;
const var2 = '10';

// console.log(`var1 == var2: ${var1 == var2}`);
// console.log(`var1 === var2: ${var1 === var2}`);
// it's safe to use '===' for equality


/**
 * CONDITIONAL STATEMENTS
 * 1. if
 * 2. else
 * 3. else if
 * 4. switch
 */

const num = 5;
// if (num > 0) console.log(`${num} is positive.`)         // if
// else if (num < 0) console.log(`${num} is negative.`)     // else if
// else console.log(`${num} is zero.`)                     // else

// if, else if, & else -> short number of alternatives
// switch -> a lot of alternatives

const color = 'red';

// switch(color) {
//     case 'red':
//         console.log(`Color is ${color}`);
//         break;
//     case 'blue':
//         console.log(`Color is ${color}`);
//         break;
//     case 'green':
//         console.log(`Color is ${color}`);
//         break;
//     default:
//         console.log(`Not a valid color`);
// }


/**
 * LOOPING CODE
 * 1. for loop
 * 2. while loop
 * 3. do...while loop
 * 4. for...of loop
 */

/**
 * For Loop
 * Syntax:
 *      for (initializer; condition; final-expression) {
 *          // code to run
 *      }
 */
let i;
// for (i = 0; i < 5; i++) console.log(`For Loop ${i}`);

/**
 * While Loop
 * Syntax:
 *      initializer
 *      while (condition) {
 *          // code to run
 *          final-expression
 *      }
 */
i =  1;
// while (i <= 5) {
//     console.log(`While Loop ${i}`);
//     i++;
// }

/**
 * Do While Loop
 * Syntax:
 *      initializer
 *      do {
 *          // code to run
 *          final expression
 *      } while (condition)
 */

i = 1;
// do {
//     console.log(`Do While Loop ${i}`);
//     i++;
// } while (i <= 5)


/**
 * For..of Loop
 * Syntax:
 *      for (const item of array) {
 *          // code to run
 *      }
 */
const numArray = [1, 2, 3, 4, 5];

// for (const num of numArray) {
//     console.log(`For..of ${num}`);
// }


/**
 * FUNCTIONS
 *  - a block of code designed to perform a particular task.
 * Syntax:
 *      function name(parameter1, parameter2, parameter3) {
 *          // code to be executed
 *      }
 */
function greet(username) {
    console.log('Hello');
    console.log(`Good morning ${username}`);
}

function add(a, b) {
    return a + b;
}

// greet('Kay24');

const sum = add(5, 10);
// console.log(`Sum: ${sum}`);

const sumArray = (a, b) => {
    return a + b;
}

const subArray = (a, b) => a - b;
const addFive = (num) => num + 5;


/**
 * SCOPE
 *   - accessibility or visibility of variables
 * 1. Block Scope
 * 2. Function Scope
 * 3. Global Scope
*/

const myNum = 10;       // Global Scope

// Block Scope - variables in curly braces can't be accessed outside them
if (true) {
    const myName = 'Ekow';
    console.log(myName);
    console.log(`myNum: ${myName}`);
}
// console.log(myName);

// Function Scope - variables in a function are not accessible outside the function
function testFn() {
    const myName ='Batman';
    console.log(myName);
    console.log(`myNum: ${myName}`);
}
// console.log(myName);


