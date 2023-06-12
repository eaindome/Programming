/*
There are different types of data that we can use in a javascript.
*/

const x = 5;
const y = "Hello";
// where 5 is an integer data and "Hello" is a string data

/*
String --- 'hello' or "hello world!"
Number --- 3, 3.234, 3e-2
BigInt --- 1n, 900719925124740999n
Boolean --- true, false
undefined -- let a;
null --- let a = null;
symbol --- let value = Symbol('hello');
object --- let student = { };
*/

// JavaScript String
//strings example
const name = 'ram';
const name1 = "hari";
const result = `The names are ${name} and ${name1}`;

// JavaScript Number
/*
Number represents integer and floating numbers (decimals and exponentials)
*/
const number1 = 3;
const number2 = 3.433;
const number3 = 3e5 // 3 * 10^5

const num1 = 3/0;
console.log(number1); // Infinity

const num2 = -3/0;
console.log(number2); // -Infinity

// strings can't be divided by numbers
const num3 = "abc"/3; 
console.log(number3);  // NaN


// Javascript BigInt
/*
In JavaScript, Number type can only represent numbers less than (253 - 1) and more than -(253 - 1). 
However, if you need to use a larger number than that, you can use the BigInt data type.
A BigInt number is created by appending n to the end of an integer. 
*/
// BigInt value
const value1 = 900719925124740998n;

// Adding two big integers
const result1 = value1 + 1n;
console.log(result1); // "900719925124740999n"

const value2 = 900719925124740998n;

// Error! BigInt and number cannot be added
const result2 = value2 + 1; 
console.log(result2); 


// JavaScript Boolean
/*
This data type represents logical entities. 
Boolean represents one of two values: true or false. 
It is easier to think of it as a yes/no switch. 
*/
const dataChecked = true;
const valueCounted = false;


// JavaScript undefined
/*
The undefined data type represents value that is not assigned. 
If a variable is declared but the value is not assigned, then the value of that variable will be undefined
*/
let name2;
console.log(name);      // undefined


// JavaScript Null
/*
In JavaScript, null is a special value that represents empty or unknown value.
*/
const number = null;


// JavaScript Symbol
/*
A value having the data type Symbol can be referred to as a symbol value. 
Symbol is an immutable primitive value that is unique.
*/
// two symbols with the same description

const value_1 = Symbol('hello');
const value_2 = Symbol('hello');


// JavaScript Object
/*
An object is a complex data type that allows us to store collections of data.
*/
const student = {
    firstName: 'ram',
    lastName: null,
    class: 10
};


// JavaScript Type
/*
JavaScript is a dynamically typed (loosely typed) language. JavaScript automatically determines the variables' data type for you.
It also means that a variable can be of one data type and later it can be changed to another data type.
*/
// data is of undefined type
let data;

// data is of integer type
data = 5;

// data is of string type
data = "JavaScript Programming";


// JavaScript typeof
/*
To find the type of a variable, you can use the typeof operator.
*/
const name3 = 'ram';
typeof(name); // returns "string"

const number5 = 4;
typeof(number); //returns "number"

const valueChecked = true;
typeof(valueChecked); //returns "boolean"

const a = null;
typeof(a); // returns "object"