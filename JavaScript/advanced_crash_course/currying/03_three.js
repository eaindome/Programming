/**
 * Scenario 3: Write a curried version of a function greet that 
 * takes a greeting message, a name, and a punctuation mark. 
 * Call it with one argument at a time, and log the complete 
 * greeting.
 */

function greet(name, message, punctuation) {
    return name + " " + message + punctuation;
}
const curriedGreeting = name => message => punctuation => greet(name, message, punctuation);

let person = "Kabukuor.\n";
let message = `Good morning, hope you are good`;
let punctuation = "!";
const hello = curriedGreeting(person);
let msg = hello(message);
let punct = msg(punctuation);

console.log(`Hello ${punct}`);

