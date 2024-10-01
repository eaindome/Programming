// const add = require('./add');


// console.log('Hello from index.js');

// const sum = add(1, 2);
// const sum2 = add(sum, 3);
// console.log(`Sum: ${sum}\nSum2: ${sum2}`);

// require('./batman');
// require('./superman');

const superHero = require('./superHero');
console.log(superHero.getName());

superHero.setName('Superman');
console.log(superHero.getName());


const newSuperHero = require('./superHero');
console.log(newSuperHero.getName());