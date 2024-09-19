/**
 * Scenario 3: Add a prototype method to an array object that calculates the 
 * sum of all elements in the array.
*/

Array.prototype.sum = function() {
    return this.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    );
}

// testing the sum method
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [10, 20, 30, 40, 50];

console.log(arr1.sum());
console.log(arr2.sum());