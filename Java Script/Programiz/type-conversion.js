/* 
In programming, type conversion is the process of converting data of one type to another. For example: converting String data to Number.

There are two types of type conversion in JavaScript.

Implicit Conversion - automatic type conversion
Explicit Conversion - manual type conversion
*/

// JavaScript Implicit Conversion
/*
In certain situations, JavaScript automatically converts one data type to another (to the right type). 
This is known as implicit conversion.
*/
// numeric string used with + gives string type
let result;

result = '3' + 2; 
console.log(result) // "32"

result = '3' + true; 
console.log(result); // "3true"

result = '3' + undefined; 
console.log(result); // "3undefined"

result = '3' + null; 
console.log(result); // "3null"
/*
When a number is added to a string, JavaScript converts the number to a string before concatenation.
*/
// numeric string used with - , / , * results number type
// implicit conversion to number
result = '4' - '2'; 
console.log(result); // 2

result = '4' - 2;
console.log(result); // 2

result = '4' * 2;
console.log(result); // 8

result = '4' / 2;
console.log(result); // 2

// non-numeric string results to NaN
// non-numeric string used with - , / , * results to NaN
result = 'hello' - 'world';
console.log(result); // NaN

result = '4' - 'hello';
console.log(result); // NaN

// implicit boolean conversion to number
// if boolean is used, true is 1, false is 0
result = '4' - true;
console.log(result); // 3

result = 4 + true;
console.log(result); // 5

result = 4 + false;
console.log(result); // 4
// Note: JavaScript considers 0 as false and all non-zero number as true. And, if true is converted to a number, the result is always 1.

// null conversion to number
// null is 0 when used with number
result = 4 + null;
console.log(result);  // 4

result = 4 - null;
console.log(result);  // 4

// undefine used with number, boolean or null
// Arithmetic operation of undefined with number, boolean or null gives NaN
result = 4 + undefined;
console.log(result);  // NaN

result = 4 - undefined;
console.log(result);  // NaN

result = true + undefined;
console.log(result);  // NaN

result = null + undefined;
console.log(result);  // NaN



// JavaScript Explicit Conversion
/*
You can also convert one data type to another as per your needs. The type conversion that you do manually is known as explicit type conversion.

In JavaScript, explicit type conversions are done using built-in methods.
*/
// Conver to Number Explicitly
// string to number
result = Number('324');
console.log(result); // 324

result = Number('324e-1')  
console.log(result); // 32.4

// boolean to number
result = Number(true);
console.log(result); // 1

result = Number(false);
console.log(result); // 0

// null values in js return 0
result = Number(null);
console.log(result);  // 0

let result1 = Number(' ')
console.log(result1);  // 0













