/**
 * Scenario 2: Implement a custom iterable object 
 * that yields each letter of a given word.
 */

const word = 'Axon Information Systems';

const obj = {
    start: 0,
    end: word.length,

    [Symbol.iterator]() {
        return {
            current: this.start,
            last: this.end,

            next() {
                while (this.current < this.last) {
                    const char = word[this.current++];
                    if (char !== ' ') {
                        return {
                            value: char,
                            done: false
                        }
                    }
                } 
                return {
                    done: true                    
                }
            }
        }
    }
};

const lettersArray = [];
for (const letter of obj) {
    lettersArray.push(letter);
}

console.log(`Letters of ${word}: ${lettersArray}`);







// const word = 'Axon Information Systems';
// console.log(word.length)