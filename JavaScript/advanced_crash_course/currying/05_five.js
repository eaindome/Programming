/**
 * Scenario 5: Write a curried version of a discount function that 
 * takes rate, price, and quantity as inputs and calculates the 
 * total discounted price. Test it with different discount rates and 
 * prices.
 */

function discount(rate, price, quantity) {
    return (price * quantity) * (rate/100);
    // return (price * quantity) * (1 - rate/100); 
    /**
     * discounted price -> (1 - rate/100)
     * discounted amount -> (rate/100)
     */
}

const curriedDiscount = rate => price => quantity => discount(rate, price, quantity);
let price = 350.00
let quantity = 2

console.log(`rate at 15%: ${curriedDiscount(15)(price)(quantity)}`);    // rate = 15%
console.log(`rate at 20%: ${curriedDiscount(20)(price)(quantity)}`);    // rate = 20%
console.log(`rate at 25%: ${curriedDiscount(25)(price)(quantity)}`);    // rate = 25%