/**
 * Scenario 5: Modify scenario 4 so that each function defines a variable with the same name. 
 * Observe which variable gets logged when called from the innermost function.
 */

function funct1() {
    let funct1 = "Function 1 variable";
    function funct2() {
        let funct2 = "Function 2 variable";
        function funct3() {
            let funct3 = "Function 3 variable";
            console.log(`funct1: ${funct1}\nfunct2: ${funct2}\nfunct3: ${funct3}`);
        }
        funct3();
    }
    return funct2;
}

const innermostFunction = funct1();
innermostFunction()