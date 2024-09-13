/**
 * Scenario 2: Create a curried function multiply that multiplies 
 * three numbers. Call it in both curried and non-curried ways 
 * to compare the output.
 */

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiplication = a => b => c => multiply(a, b, c);

// curried way
let product = curriedMultiplication(2)(4)(8);
console.log(`Curried Product: ${product}`);

// non-curried way
let nonCurriedProduct = multiply(2, 4, 8);
console.log(`Non-Curried Product: ${nonCurriedProduct}`);