/**
 * Scenario 4: Implement a makeMultiplier function that takes 
 * a number as an argument and returns a function that multiplies 
 * any number passed to it by the first number.
 */

function makeMultiplier(num) {
    return function multiplies(num2) {
        let result = num * num2;
        console.log(`result: ${result}`);
        // return num * num2;
    }
}

const multiplier = makeMultiplier(2);
multiplier(8);

