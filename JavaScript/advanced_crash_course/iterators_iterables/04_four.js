/**
 * Scenario 4: Create a Fibonacci sequence generator as an 
 * iterable object and log the first 10 numbers.
 */

// const fibonacciSequenceGenerator = {
//     start: 0,
//     end: 10,

//     [Symbol.iterator]() {
//         return {
//             current: this.start,
//             last: this.end,

//             next() {
//                 if (this.current <= 1) {
//                     const num = this.current;
//                     this.current++;
//                     return {
//                         value: num,
//                         done: false
//                     }
//                 } else if (this.current <= this.last) {
//                     const integer = (this.current - 1) + (this.current - 2);
//                     this.current++;
//                     return {
//                         value: integer,
//                         done: false

//                     }
//                 } else {
//                     return {
//                         done: true
//                     }
//                 }
//             }
//         }
//     }
// }

const fibonacciSequenceGenerator = {
    limit: 10,

    [Symbol.iterator]() {
        let prev = 0, curr = 1;
        let count = 0;

        return {
            next() {
                if (count < fibonacciSequenceGenerator.limit) {
                    let value = prev;
                    [prev, curr] = [curr, prev + curr];
                    count++;
                    return {
                        value: value,
                        done: false
                    }
                } else {
                    return {
                        done: true
                    };
                } 
            }
        }
    }
}

const fibNumbers = [];
for (const digits of fibonacciSequenceGenerator) {
    fibNumbers.push(digits);
}

console.log(`The first 10 fibonacci numbers: ${fibNumbers}`);