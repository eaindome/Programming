/**
 * Scenario 5: Create a function that returns a function to 
 * calculate the factorial of a number using closures. 
 * Ensure that the returned function "remembers" the previous 
 * values it has computed.
 */

function funct(num) {
    return function factorial() {
        let fact = 1;
        for (let i = num; i > 1; i--) {
            fact *= i;
        }
        return fact;
    }
}

const calculateFact = funct(6);
console.log(`calculate factorial: ${calculateFact()}`);