/**
 * Scenario 3: Create a constructor function 
 * Animal that assigns a name to an instance 
 * using the this keyword. Create multiple instances 
 * of Animal and log their names.
 */

function Animal(name) {
    this.name = name;
}

const biggest_animal_in_the_sea = new Animal('Whale');
const mans_best_friend = new Animal('Dog');
const the_king_of_the_jungle = new Animal('Lion');

console.log(`Biggest animal in the sea: ${biggest_animal_in_the_sea.name}\n
    Man's best friend: ${mans_best_friend.name}\n
    The King of the jungle: ${the_king_of_the_jungle.name}`);