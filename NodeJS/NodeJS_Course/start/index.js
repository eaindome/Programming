const add = require('./add');


console.log('Hello from index.js');

const sum = add(1, 2);
const sum2 = add(sum, 3);
console.log(`Sum: ${sum}\nSum2: ${sum2}`);