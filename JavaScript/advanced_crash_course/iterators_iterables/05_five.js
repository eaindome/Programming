/**
 * Scenario 5: Create a Range object that is iterable 
 * and produces numbers from a start to an end value.
 */

const Range = {
    start: 10,
    end: 50,

    [Symbol.iterator]() {
        return {
            current: this.start,
            last: this.end,

            next() {
                if (this.current <= this.last) {
                    const value = this.current;
                    this.current++;
                    return {
                        value: value,
                        done: false
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }
}

const rangeArray = [];
for (const num of Range) {
    rangeArray.push(num);
}

console.log(`Range from ${Range.start} to ${Range.end}:`, rangeArray);