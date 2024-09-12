/**
 * Scenario 3: Create a function outer that returns a function inner. 
 * The inner function should be able to access a variable defined in outer. 
 * Invoke outer, then invoke inner and observe the scope behavior.
 */

function outer() {
    let varb = "local variable";
    function inner() {
        console.log(`accessing local variable: ${varb}`);
    }
    return inner;
}

const innerFunction = outer();
innerFunction();