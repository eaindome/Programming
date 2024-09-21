/**
 * Scenario 1: Create an iterator that generates the first 10 square numbers.
 */

const squareNumbers = {
    count: 1,
    max: 10,

    [Symbol.iterator]() {
        return {
            current: this.count,
            last: this.max,

            next() {
                if (this.current <= this.last) {
                    const square = this.current * this.current;
                    this.current++;
                    return {
                        value: square,
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        }
    }
};

const squareNumbsArray = [];
for (const square of squareNumbers) {
    squareNumbsArray.push(square);
}

console.log(`Square numbers: ${squareNumbsArray}`);