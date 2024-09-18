/**
 * Scenario 1: Create an object car with a method startEngine. 
 * Use the this keyword inside startEngine to log the car's name. 
 * Call the method and observe the behavior of this.
 */

const Car = {
    name: 'Aston Martin',
    startEngine() {
        let identity = this.name;
        console.log(`The engine of the ${identity} is startin...`);
    }
}

Car.startEngine();