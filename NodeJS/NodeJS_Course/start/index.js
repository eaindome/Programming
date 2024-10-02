// const add = require('./add');


// console.log('Hello from index.js');

// const sum = add(1, 2);
// const sum2 = add(sum, 3);
// console.log(`Sum: ${sum}\nSum2: ${sum2}`);

// require('./batman');
// require('./superman');

// const superHero = require('./superHero');

// const batman = new superHero('Batman');
// console.log(batman.getName());

// batman.setName('Bruce Wayne.');
// console.log(batman.getName());


// const superman = new superHero('Superman');
// console.log(superman.getName());

// superman.setName('Clark Kent.');
// console.log(superman.getName());

// const math = require('./math');

// const { add, subtract } = math;
// console.log(add(2, 3));
// console.log(subtract(2, 3));

// const data = require('./data.json');    // recommend .json xtension 

// console.log(data);
// console.log(`Data: ${JSON.stringify(data)}`);

// to run the js file in watch mode, enter: 'node --watch filename'



const path = require("node:path");

// console.log(__filename);
// console.log(__dirname);
// console.log('')

// // basename
// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));
// console.log('')

// // extension
// console.log(path.extname(__filename));
// console.log(path.extname(__dirname));
// console.log('')

// // info of file
// console.log(path.parse(__filename));

// // original string
// console.log(path.format(path.parse(__filename)));

// // is absolute path?
// console.log(path.isAbsolute(__filename));
// console.log(path.isAbsolute("./data.json"));

// console.log(path.join('folder1', 'folder2', 'index.html'));
// console.log(path.join('/folder1', 'folder2', 'index.html'));
// console.log(path.join('/folder1', '//folder2', 'index.html'));
// console.log(path.join('/folder1', '//folder2', '../index.html'));
// console.log(path.join(__dirname, 'data.json'));

// console.log(path.resolve('folder1', 'folder2', 'index.html'));
// console.log(path.resolve('/folder1', 'folder2', 'index.html'));
// console.log(path.resolve('/folder1', '//folder2', 'index.html'));
// console.log(path.resolve('/folder1', '//folder2', '../index.html'));
// console.log(path.resolve(__dirname, 'data.json'));

// function greet(name) {
//     console.log(`Hello ${name}`);
// }

// function greetKay(greetFn) {
//     const name = 'Kabukuor';
//     greetFn(name);
// }

// greetKay(greet)

// a function passed to another function is called as a callback function


// Events module
// const EventEmitter = require("node:events");

// const emitter = new EventEmitter();

// emitter.on('order-pizza', (size, topping) => {
//     console.log(`Order received! Baking a ${size} pizza with ${topping}.`)
// });

// emitter.on('order-pizza', (size) => {
//     if (size === 'large') console.log('Serving complimentary drink.');
// });

// emitter.emit('order-pizza', 'large', 'mushroom');


// Extending from eventemitter
// const PizzaShop = require('./pizza_shop');
// const DrinkMachine = require('./drink_machine');

// const pizzaShop = new PizzaShop();
// const drinkMachine = new DrinkMachine()

// pizzaShop.on('order', (size, topping) => {
//     console.log(`Order received! Baking a ${size} pizza with ${topping}.`);
//     drinkMachine.serveDrink(size);
// });

// pizzaShop.order('large', 'pepperoni')
// pizzaShop.displayOrderNumber();


/**
 * Binary data - 0s and 1s that computers can understand
 * Character sets - Predefined lists of characters represented by numbers
 * Character encoding - Dictates how to represent a number in a character set as binary data
 * Streams - a sequence of data that is being moved from one point to another over time
 * Buffer - an intentionally small area that Node maintains in the runtime to process a stream of data
 */
// const buffer = new Buffer.from("Kabukuor", 'utf-8');

// buffer.write('Code');

// console.log(buffer.toString());
// console.log(buffer.toJSON());
// console.log(buffer);
