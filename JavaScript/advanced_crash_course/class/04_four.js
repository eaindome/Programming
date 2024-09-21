/**
 * Create a Person class and a Programmer class that extends it. 
 * Add a method in Programmer to log the programming language they use.
 */

class Person {
    constructor(name) {
        this.name = name;
    }
}

class Programmer extends Person {
    constructor(name, programming_language) {
        super(name);
        this.programming_language = programming_language;
    }
    
    language() {
        return `${this.name} codes using the ${this.programming_language} language` ;
    }
}

const dev = new Programmer('Ekow', 'Javascript');
console.log(dev.language());