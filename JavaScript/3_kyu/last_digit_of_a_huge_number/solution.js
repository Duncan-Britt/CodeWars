
function lastDigit(as){
  if (as.length === 0) return 1;
  let lDigits = as.map(n => {
    return Number(String(n).slice(-2));
  });

  if (lDigits.length === 1) return Number(lDigits[0]);

  const num = Number(
    String(lDigits[0]).slice(-1)
  )**Number(String(calc(lDigits.slice(1))).slice(-2));

  return Number(String(num).slice(-1));
}

function calc(as) {
  let lDigits = as.map(n => {
    return Number(String(n).slice(-2));
  });

  if (lDigits.length === 1) return lDigits[0];

  return Number(String(lDigits[0]).slice(-1))**calc(lDigits.slice(1));
}

console.log(lastDigit([]         )); //, 1);
console.log(lastDigit([0,0]      )); //, 1); // 0 ^ 0
console.log(lastDigit([0,0,0]    )); //, 0); // 0^(0 ^ 0) = 0^1 = 0
console.log(lastDigit([1,2]      )); //, 1);
console.log(lastDigit([3,4,5]    )); //, 1);
console.log(lastDigit([4,3,6]    )); //, 4);
console.log(lastDigit([7,6,21]   )); //, 1);
console.log(lastDigit([12,30,21] )); //, 6);
console.log(lastDigit([2,2,2,0]  )); //, 4);
console.log(lastDigit([937640,767456,981242] )); //, 0);
console.log(lastDigit([123232,694022,140249] )); //, 6);
console.log(lastDigit([499942,898102,846073] )); //, 6);
