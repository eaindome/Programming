/**
 * Scenario 3: Create a generator that produces 
 * a sequence of random numbers until a 
 * specific limit is reached.
 */

function* sequence(limit) {
    let count = 0;
    while (count < limit) {
        yield Math.floor(Math.random() * 100000) + 1;
        count++;
    }
}

const numbers = sequence(10);

for (const num of numbers) {
    console.log(num);
}