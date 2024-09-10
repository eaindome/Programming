/**
 * NESTED FUNCTION'S SCOPE
 * 
*/
let a = 10;                     // global scope
function outer () {         // outer function scope
    let b = 20;                 // function based scope
    function inner() {      // inner function scope
        let c = 30;
        console.log(a, b, c);   // nested function scope
    }
    inner();
}
outer()





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