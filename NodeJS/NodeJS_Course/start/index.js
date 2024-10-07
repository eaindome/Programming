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


// fs module
// const fs = require('node:fs');

// console.log('First');
// const fileContents = fs.readFileSync('./file.txt', 'utf-8');
// console.log(fileContents);


// console.log('Second');
// fs.readFile("./file.txt", (err, data) => {
//     if (err) {
//         console.error(`Error: ${err}`);
//         return '';
//     }

//     console.log(`Data:\n${data}\n`);
// });

// console.log('Third\n');

// fs.writeFileSync('./greet.txt', 'Hello world!\n');

// fs.writeFile('./greet.txt', 'Hello Beautiful!', { flag: "a" }, (err) => {
//     if (err) {
//         console.error(`Error: ${err}`);
//         return '';
//     }

//     console.log('Successfully written to file!')
// });


// fs promise module
// const fs = require('node:fs/promises');

// console.log('First\n');
// fs.readFile('file.txt', 'utf-8')
//     .then(data => console.log(data))
//     .catch((err) => console.log(err));

// console.log('Second\n');

// async function readFile() {
//     try {
//         const data = await fs.readFile('file.txt', 'utf-8');
//         console.log(`Data:\n${data}`);
//     } catch (err) {
//         console.error(`Error: ${err}`);
//         return '';
//     }
// }

// readFile();


// Streams
// const fs = require('node:fs');

// const readableStream = fs.createReadStream('./file.txt', {
//     encoding: 'utf-8',
//     // highWaterMark: 2,
// });

// const writeableStream = fs.createWriteStream('./file2.txt');

// readableStream.on('data', (chunk) => {
//     console.log(`Chunk:\n${chunk}`);
//     writeableStream.write(chunk);
// });



// Pipes
// Connects a readable stream to a writeable stream
// const fs = require('node:fs');
// const zlib = require('node:zlib');

// const gzip = zlib.createGzip();

// const readableStream = fs.createReadStream('./file.txt', {
//     encoding: 'utf-8',
//     // highWaterMark: 2,
// });

// readableStream.pipe(gzip).pipe(fs.WriteStream('./file2.txt.gz'));

// const writeableStream = fs.createWriteStream('./file2.txt');

// readableStream.pipe(writeableStream);


// Node server
// const http = require("node:http");

// const server = http.createServer((request, response) => {
//     console.log(`Request: ${request}`);
//     response.writeHead(200, {
//         "Content-Type": "text/plain"
//     });
//     response.end("Hello world");
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });


// JSON Response
// const http = require("node:http");

// const server = http.createServer((request, response) => {

//     const superHero = {
//         firstName: "Bruce",
//         lastName: "Wayne"
//     };

    
//     response.writeHead(200, {
//         "Content-Type": "application/json"
//     });
//     response.end(JSON.stringify(superHero));
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });


// HTML Response
// const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((request, response) => {
//     response.writeHead(200, {
//         "Content-Type": "text/html"
//     });
//     // const html = fs.readFileSync('index.html', 'utf-8');
//     fs.createReadStream(__dirname + 'index.html').pipe(response);
//     // response.end(html);
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });


// HTML Template
// const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((request, response) => {
//     const name = 'Kay24';
//     response.writeHead(200, {
//         "Content-Type": "text/html"
//     });
//     let html = fs.readFileSync('index.html', 'utf-8');

//     html = html.replace("{{name}}", name);
    
//     response.end(html);
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });



// HTTP Routing
// const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((req, res) => {
//        if (req.url === '/') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain"
//         });
//         res.end("Home page");
//     } else if (req.url === '/about') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain"
//         });
//         res.end("About page")
//     } else if (req.url === '/api') {
//         res.writeHead(200, {
//             "Content-Type": "application/json"
//         });
//         res.end(JSON.stringify({
//             firstName: "Bruce",
//             lastName: "Wayne"
//         }));
//     } else {
//         res.writeHead(404);
//         res.end("Page not found")
//     }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });



// Thread Pool
// const crypto = require('node:crypto');

// const MAX_CALLS = 3;

// const start = Date.now();
// for (let i = 0; i < MAX_CALLS; i++) {
//     crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
//     console.log(`Hash: ${i + 1}`, Date.now() - start);
//     });
// }

// sync
// const start = Date.now();
// crypto.pbkdf2Sync('password', 'salt', 100000, 512, 'sha512');
// console.log('Hash: ', Date.now() - start);

// every method in node.js that has the 'sync' suffix always runs on the
// main thread and is blocking


// Thread Pool Size
// const crypto = require('node:crypto');

// process.env.UV_THREADPOOL_SIZE = 8;
// const MAX_CALLS = 8;

// const start = Date.now();
// for (let i = 0; i < MAX_CALLS; i++) {
//     crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
//     console.log(`Hash: ${i + 1}`, Date.now() - start);
//     });
// }

/**
 * Increasing the thread pool size can help with performance
 * but that is limited by the number of available CPU cores
 */


// Network I/O
// const https = require("node:https");
// // const crypto = require('node:crypto');

// // process.env.UV_THREADPOOL_SIZE = 8;
// const MAX_CALLS = 12;

// const start = Date.now();
// for (let i = 0; i < MAX_CALLS; i++) {
//     https
//         .request("https://www.google.com", (res) => {
//             res.on("data", () => {});
//             res.on("end", () => {
//                 console.log(`Request: ${i + 1}`, Date.now() - start);
//             });
//         })
//         .end();
// //     crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
// //     console.log(`Hash: ${i + 1}`, Date.now() - start);
// //     });
// }



// Event Loops
/**
 * A design pattern that orchestrates or co-ordinates the execution 
 * of synchronous and asynchronous code in Node.js
 */

// Microtask Queues
// Ex 1
// console.log("console.log 1");
// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });
// console.log("console.log 2");
/**
 * All user written synchronous Javascript code takes
 * priority over async code
 */

// Ex 2
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });
// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });

// Ex 3
// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });
// process.nextTick(() => {
//     console.log("this is process.next tick 2");
//     process.nextTick(() => {
//         console.log("this is the inner next tick inside next tick.");
//     });
// });
// process.nextTick(() => {
//     console.log("this is process.next tick 3");
// });


// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 2");
//     process.nextTick(() => {
//         console.log("this is the inenr next tick inside Promise then block");
//     });
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 3");
// });


// Timer Queue
// setTimeout(() => {
//     console.log("this is setTimeout 1")
// }, 0);
// setTimeout(() => {
//     console.log("this is setTimeout 2");
//     process.nextTick(() => {
//         console.log("this is the inner next tick inside setTimeout block");
//     });
// }, 0);
// setTimeout(() => {
//     console.log("this is setTimeout 3")
// }, 0);


// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });
// process.nextTick(() => {
//     console.log("this is process.next tick 2");
//     process.nextTick(() => {
//         console.log("this is the inner next tick inside next tick.");
//     });
// });
// process.nextTick(() => {
//     console.log("this is process.next tick 3");
// });


// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 2");
//     process.nextTick(() => {
//         console.log("this is the inenr next tick inside Promise then block");
//     });
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 3");
// });

/**
 * Callbacks in microtask queues are executed in between the execution
 * of callbacks in the timer queue
 */

// setTimeout(() => {
//     console.log("this is setTimeout 1")
// }, 1000);

// setTimeout(() => {
//     console.log("this is setTimeout 2")
// }, 500);

// setTimeout(() => {
//     console.log("this is setTimeout 3")
// }, 0);

/**
 * Timer queue callbacks are executed in FIFO order
*/


// const fs = require("fs");

// setTimeout(() => {
//     console.log("this is setTimeout 1")
// }, 0);

// fs.readFile(__filename, () => {
//     console.log("this is readFile 1");
// });

// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });

// setTimeout(() => {
//     console.log("this is setTimeout 1");
// });

/**
 * When running setTimeout wth delay 0m/s
 * and an I/O async method, the order of execution can
 * never be guaranteed
 * */


// I/O Polling

/**
 * To queue a callback function into the chck queue, we can use a function called setImmediate
 * Syntax:
 *  setImmediate(() => {
 *      console.log("this is setImmediate 1");
 *  });
 */

// const fs = require("fs");

// fs.readFile(__filename, () => {
//     console.log("this is readFile 1");
// });

// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });

// setTimeout(() => {
//     console.log("this is setTimeout 1");
// }, 0);
// setImmediate(() => {
//     console.log("this is setImmediate 1");
// });

// for (let i = 0; i < 2000000000; i++) {}

/**
 * I/O events are polled and callback functions are 
 * added to the I/O queue only after the I/O is complete
 */


// Check Queue
// const fs = require("fs");

// fs.readFile(__filename, () => {
//     console.log("this is readFile 1");
//     setImmediate(() => {
//         console.log("this is inner setImmediate inside readFile 1");
//     });
//     process.nextTick(() => {
//         console.log("this is inner process.next tick inside readFile 1");
//     });
//     Promise.resolve().then(() => {
//         console.log("this is inner Promise.resolve inside readFile 1");
//     });
// });

// process.nextTick(() => {
//     console.log("this is process.next tick 1");
// });
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });

// setTimeout(() => {
//     console.log("this is setTimeout 1");
// }, 0);

// for (let i = 0; i < 2000000000; i++) {}

/**
 * Microtask queues callbacks are executed after I/O callbacks
 * and before check queue callbacks
 */

// setImmediate(() => {
//     console.log("this is setImmediate 1");
// });
// setImmediate(() => {
//     console.log("this is setImmediate 2");
//     process.nextTick(() => {
//         console.log("this is process.nextTick 1");
//     });
//     Promise.resolve().then(() => {
//         console.log("this is Promise.resolve 1");
//     });
// });
// setImmediate(() => {
//     console.log("this is setImmediate 3");
// });

/**
 * Microtask queues callbacks are executed in between check queue callbacks
 */

// setTimeout(() => {
//     console.log("this is setTimeout 1");
// }, 0);
// setImmediate(() => {
//     console.log("this is setImmediate 1");
// });



// Close Queue
// const fs = require("fs");

// const readableStream = fs.createReadStream(__filename);
// readableStream.close();

// readableStream.on("close", () => {
//     console.log("this is from readableStream close event callback");
// });

// setImmediate(() => {
//     console.log("this is setImmediate 1");
// });
// setTimeout(() => {
//     console.log("this is setTimeout 1");
// }, 0);
// Promise.resolve().then(() => {
//     console.log("this is Promise.resolve 1");
// });
// process.nextTick(() => {
//     console.log("this is process.nextTick 1");
// });

/**
 * Close queue callbacks are executed after all other queues callbacks in a given iteration
 * of the event loop
 */