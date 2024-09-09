let num = [1, 2, 0, 0];
let k = 34;

let str_num = num.map(String);
let join_str_num = str_num('');

let num_plus_k = parseInt(join_str_num) + k;
let result = String(num_plus_k);

let result_array = result.split('').map(Number);
console.log(`Result Array: ${result_array}`);