/**
 * Scenario 4: Create a Bird constructor with a fly method. 
 * Then create a Penguin constructor that inherits from 
 * Bird but overrides fly with a message saying penguins 
 * can't fly.
 */

function Bird(name) {
    this.name = name;
}

Bird.prototype.fly = function() {
    return `${this.name} can fly`;
}

function Penguin(name) {
    Bird.call(this, name);
}

Penguin.prototype = Object.create(Bird.prototype);

Penguin.prototype.constructor = Penguin;

Penguin.prototype.fly = function() {
    return `${this.name} cannot fly.`
}

const bird1 = new Bird('Eagle');
console.log(bird1.fly());

const bird2 = new Penguin('Galápagos Penguin');
console.log(bird2.fly());


