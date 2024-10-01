// const add = require('./add');


// console.log('Hello from index.js');

// const sum = add(1, 2);
// const sum2 = add(sum, 3);
// console.log(`Sum: ${sum}\nSum2: ${sum2}`);

// require('./batman');
// require('./superman');

const superHero = require('./superHero');

const batman = new superHero('Batman');
console.log(batman.getName());

batman.setName('Bruce Wayne.');
console.log(batman.getName());


const superman = new superHero('Superman');
console.log(superman.getName());

superman.setName('Clark Kent.');
console.log(superman.getName());