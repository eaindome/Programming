/**
 * Scenario 2: Define a global variable globalVar. 
 * Then, create a function that defines another variable localVar. 
 * Inside that function, create another function that defines a third 
 * variable innerVar, and log all three variables.
 */

let globalVar = "Global variable";

function funct1() {
    let localVar = "Local variable";
    function funct2() {
        let innerVar = "Inner variable";
        console.log(`globalVar: ${globalVar}\nlocalVar: ${localVar}\ninnerVar: ${innerVar}`);
    }
    funct2();
}

funct1();