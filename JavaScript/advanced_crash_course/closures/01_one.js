/**
 * Scenario 1: Write a function counter that returns another function. 
 * The returned function should increment a count variable every time it is called. 
 * Test the behavior by calling the returned function multiple times.
 */

function counter() {
    let count = 0;
    function increment() {
        count++;
        console.log(`counter: ${count}`);
    }
    return increment;
}
const incrementCounter = counter();

incrementCounter();
incrementCounter();
incrementCounter();