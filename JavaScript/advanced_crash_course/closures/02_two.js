/**
 * Scenario 2: Create a function greet that accepts a name and 
 * returns another function that, when called, logs a greeting 
 * message using the name. 
 * Call greet and the returned function.
 */

function greet(name) {
    function greeting() {
        console.log(`Hello ${name}.\nHope you good! I've missed you.`)
    }
    return greeting;
}

const greetSomeone = greet("Kabukuor");
greetSomeone();