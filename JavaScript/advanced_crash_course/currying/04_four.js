/**
 * Scenario 4: Build a curried function that calculates the volume 
 * of a box (volume(length, width, height)). Test it with partial 
 * applications like volume(2)(3)(4).
 */

function box(length, width, height) {
    return length * width * height;
}

const volume = length => width => height => box(length, width, height);
console.log(`vol: ${volume(4)(2)(3)}`);