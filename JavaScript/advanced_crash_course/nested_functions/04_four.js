/**
 * Scenario 4: Create two nested functions inside a third function. 
 * Ensure the innermost function tries to access a variable from the outermost function. 
 * What happens if that variable is not passed down the chain?
 */

function funct1() {
    let outermostVar = "Outermost variable";
    function funct2() {
        function funct3() {
            console.log(`Accessing outermost variable: ${outermostVar}`);
        }
        funct3();
    }
    return funct2;
}

const funct2Returned = funct1();
funct2Returned();

/**
 * If the variable isn't passed, JavaScript still looks for the variable
 * in the enclosing scopes
 * If the variable did not exit in any outer scope, JavaScript would throw
 * a `ReferenceError` when trying to access it.
 */