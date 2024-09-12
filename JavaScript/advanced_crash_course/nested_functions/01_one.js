/**
 * Scenario 1: 
 * Create a function outer that defines a variable x and an inner function inner. 
 * Inside inner, define a variable y and log both x and y. 
 * Call inner from within outer and check the console output.
 */

function outer() {
    let x = 10;
    function inner() {
        let y = 20;
        console.log(`x: ${x}; y: ${y}`);
    }
    inner();
}

outer();