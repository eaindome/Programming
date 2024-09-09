let length = 200;
let width = 50;
let height = 800;
let mass = 50;

let volume = length * width * height;
let is_bulky = (length >= (10**4)) || (width >= (10**4)) || (height >= (10**4)) || (mass >= (10**4)) || (volume >= (10**9));
let is_heavy = mass >= 100;

if (is_bulky && is_heavy) console.log("Both");
else if (!is_bulky && !is_heavy) console.log("Neither");
else if (is_bulky) console.log("Bulky");
else console.log("Heavy");