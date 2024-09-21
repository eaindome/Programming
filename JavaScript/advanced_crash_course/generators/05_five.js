/**
 * Scenario 5: Write a generator function that takes 
 * an array of names and yields each name, one by 
 * one, until all names are exhausted.
 */

function* namesYield(arr) {
    for (const name of arr) {
        yield name;
    }
}

const africanNames = namesYield(['Kwadwo', 'Kobina', 'Kwame', 'Ekow', 'Kofi', 'Kwesi']);

for (const nme of africanNames) {
    console.log(nme);
}
