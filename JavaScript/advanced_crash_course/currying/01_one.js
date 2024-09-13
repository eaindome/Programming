/**
 * Scenario 1: Convert a regular sum(a, b, c) function 
 * into a curried function. Then call it as sum(2)(3)(5) and 
 * verify that it works.
*/

function summation(x, y, z) {
    return x + y + z;
}

function add(summation) {
    return function num1(x) {
        return function num2(y) {
            return function num3 (z) {
                return summation(x, y, z);
            }
        }
    }
}

const curriedSum = x => y => z => summation(x, y, z);

const sum = add(summation);
console.log(`1 + 2 + 3 = ${sum(1)(2)(3)}`);

console.log(`4 + 5 + 6 = ${curriedSum(4)(5)(6)}`);