// JavaScript Operators
/**
 * In JavaScript, an operator is a special symbol used to perform operations on operands (values and variables).
 */

// JavaScript Operator Types
/**
 * Assignment Operators
 * Arithmetic Operators
 * Comparison Operators Logical Operators
 * Bitwise Operators
 * String Operators
 * Other Operators
*/


// JavaScript Assignment Operators
/*
Assignment operators are used to assign values to variables.
*/
const X = 5;
/**
 * = --- Assignment operator --- a= 7;              // 7 
 * += --- Addition assignment --- a += 5;           // a = a + 5
 * -= --- Subtraction assignment --- a -= 2;        // a = a - 5
 * *= --- Multiplication assignment --- a *= 3;     // a = a * 3
 * /= --- Division assignment --- a /= 2;           // a = a / 2
 * %= --- Remainder assignment --- a %= 2;          // a = a % 2
 * **= --- Exponentiation assignment --- a **= 2;   // a = a**2
*/


// JavaScript Arithmetic Operators
/*
Arithmetic operators are used to perform arithmetic calculations.
*/
const number = 3 + 5; // 8
/**
 * + --- Additon --- x + y
 * - --- Subtraction --- x - y
 * * --- Multiplication --- x * y
 * / --- Division --- x / y
 * % --- Remainder --- x % y
 * ++ --- Increment (increments by 1) --- ++x or x++
 * -- --- Decrement (decrements by 1) --- --x or x--
 * ** --- Exponentiation (Power) --- x ** y
 */
let x = 5;
let y = 3;

// addition
console.log('x + y = ', x + y);  // 8

// subtraction
console.log('x - y = ', x - y);  // 2

// multiplication
console.log('x * y = ', x * y);  // 15

// division
console.log('x / y = ', x / y);  // 1.6666666666666667

// remainder
console.log('x % y = ', x % y);   // 2

// increment
console.log('++x = ', ++x); // x is now 6
console.log('x++ = ', x++); // prints 6 and then increased to 7
console.log('x = ', x);     // 7

// decrement
console.log('--x = ', --x); // x is now 6
console.log('x-- = ', x--); // prints 6 and then decreased to 5
console.log('x = ', x);     // 5

//exponentiation
console.log('x ** y =', x ** y);