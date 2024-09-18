/**
 * Scenario 4: Write a function that logs the value of this 
 * inside the global context. Then call the function in 
 * strict mode and observe how this changes.
 */
'use strict'; // using the strict mode

globalThis.value = 10;

function strictLogValue() {
    console.log(`${this} is a value`);
}

strictlogValue();

/**
 * With strict mode:
    Inside strictLogValue, this is undefined because in 
    strict mode, this doesn't default to the global 
    object in functions that are invoked without an 
    object context.
 */