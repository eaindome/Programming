/**
 * Scenario 4: Write a function that logs the value of this 
 * inside the global context. Then call the function in 
 * strict mode and observe how this changes.
 */
// 'use strict'; without the strict mode

globalThis.value = 10;

function logValue() {
    console.log(`${this.value} is a value`);
}

logValue();

/**
 * Without strict mode:
    The global object (globalThis in Node.js or window in the browser) 
    holds the value property. When the logValue function 
    is called, this refers to the global object, so 
    this.value outputs 10.
 */