/**
 * NESTED FUNCTION'S SCOPE
 * 
*/
// let a = 10;                     // global scope
// function outer () {         // outer function scope
//     let b = 20;                 // function based scope
//     function inner() {      // inner function scope
//         let c = 30;
//         console.log(a, b, c);   // nested function scope
//     }
//     inner();
// }
// outer()

/**
 * CLOSURES
 *    - the combination of a function bundled together with references to its surrounding state
 *    - created every time a function is created i.e. at function creation time
 * 
 *    * Other definition
 *      - when we return a function from another function, we are 
 *        effectively returning a combination of the function definition along with the function's scope.
 *        This would let the function definition have an associated persisten memory which could hold on 
 *        to live data between executions. That combination of the functino and its scope chain is what is
 *        called a closuer in JavaScript.
// */
// function outer() {
//     let counter = 0;
//     function inner() {
//         counter++;
//         // console.log(`counter: ${counter}`);
//     }
//     return inner;
// }
// const fun = outer();
// fun();
// fun();
 

/**
 * CURRYING
 *     - a process in functional programming in which we transform a function
 *      with multiple arguments into a sequence of nesting functions that take one arguments at a time.
 *      function f(a, b, c) => f(a)(b)(c)
*/
function sum(a, b, c) {
    return a + b + c
}
console.log(`sum: ${sum(2, 3, 5)}`);

// sum(2, 3, 5) => sum(2)(3)(5)

function curry(func) {
    return function(a) {
        return function(b) {
            return function(c) {
                return func(a, b, c);
            }
        }
    }
}

const curriedSum = curry(sum)
console.log(`curriedSum: ${curriedSum(2)(3)(5)}`);

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
console.log(`
    add2: ${add2}\n
    add3: ${add3}\n
    add5: ${add5}
`);





/**
 * THIS KEYWORD
*/



/**
 * PROTOTYPE
*/



/**
 * PROTOTYPEAL INHERITANCE
*/



/** 
 * CLASS 
*/



/**
 * ITERABLES AND ITERATORS
*/



/**
 * GENERATORS
*/