/**
 * Scenario 1: Create a generator function that yields 
 * numbers from 1 to 5. Call it and log each value.
 */

// function* generateNumbers(start, end) {
//     for (let i = start; i <= end; i++) {
//         yield i;
//     }
// }

function* naturalNums() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const generateNums = naturalNums();
for (const num of generateNums) {
    console.log(num);
}