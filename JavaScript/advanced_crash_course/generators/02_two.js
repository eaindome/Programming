/**
 * Scenario 2: Write a generator that yields the first n 
 * Fibonacci numbers, where n is passed as an argument.
 */

function* fibSequence(n) {
    let prev = 0, curr = 1;
    let count = 0;

    while (count < n) {
        yield prev;
        [prev, curr] = [curr, prev+curr];
        count++;
    }
}

const fibGen = fibSequence(10);

for (const num of fibGen) {
    console.log(num);
}