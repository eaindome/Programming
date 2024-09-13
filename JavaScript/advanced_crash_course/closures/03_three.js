/**
 * Scenario 3: Write a function adder that takes an initial value and returns another function. 
 * The returned function should take a new value, add it to the initial value, and return the result.
 * Test it with different numbers.
 */

function adder(val) {
    function inner(new_val) {
        let result = val + new_val;
        return result;
    }
    return inner;
}

const addValue = adder(4)
console.log(`add value 2: ${addValue(2)}`);
console.log(`add value 5: ${addValue(5)}`);