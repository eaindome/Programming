/**
 * Scenario 4: Use a generator function to simulate 
 * the traffic light system, yielding 
 * 'Red', 'Yellow', and 'Green' in sequence.
 */

function* trafficLight() {
    yield 'Red';
    yield 'Yellow';
    yield 'Green';
}

const traffic = trafficLight();

for (const color of traffic) {
    console.log(color);
}