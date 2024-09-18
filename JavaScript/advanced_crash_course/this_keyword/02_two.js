/**
 * Scenario 2: Write a function introduce that 
 * uses this.name. Call it using the call() 
 * method with different objects that have a 
 * name property.
 */

function introduce() {
    console.log(`Hi, my name is ${this.name}`);
}

const person1 = {
    name: 'Chouquettes'
}

const person2 = {
    name: 'Ekow'
}

introduce.call(person1);
introduce.call(person2);