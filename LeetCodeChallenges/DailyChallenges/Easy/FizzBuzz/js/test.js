let n = 5;
let result = [];
let i = 1;

while (i <= n) {
    if ((i%3 === 0) && (i%5 === 0)) result.push('FizzBuzz');
    else if (i%3 === 0) result.push('Fizz');
    else if (i%5 === 0) result.push('Buzz');
    else result.push(i.toString());
    i++;
}

console.log(`result = ${result}`);