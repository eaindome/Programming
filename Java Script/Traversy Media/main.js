// variables
// let, const

let age1 = 30;
age1 = 31;

let score;
score = 10

console.log(age)
console.log(score)

// datatypes
const name = 'John';
const age = 30;
const isCool = true;
const rating = 4.5;
const x = null;
const y = undefined
let z;

console.log(typeof name)
console.log(typeof age)
console.log(typeof isCool)
console.log(typeof rating)
console.log(typeof x)
console.log(typeof y)
console.log(typeof z)

// strings
// concatenation
console.log('My name is' + name + 'and I am '+ age)
// template string
const hello = 'My name is ${name} and I am ${age} years old';
console.log(hello)

// string properties and methods
const s = 'Hello World';
console.log(s.length)
console.log(s.toUpperCase())
console.log(s.toLowerCase())
console.log(s.substring(0, 5))
console.log(s.substring(0, 5).toUpperCase())
console.log(s.split(''))