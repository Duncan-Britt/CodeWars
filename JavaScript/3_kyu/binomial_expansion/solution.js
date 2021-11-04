// input:
// - string
// output:
// - also string
//
// expression components
// - variable
// - coeffecient of variable
// - other number
// - exponent

function expand(expr) {
  const [ varCoef, variable, nomial, exponent ] = parse(expr);
  if (exponent === 0) return '1';

  const coeffecients = pascalsTriangle(exponent);
  const terms = [];

  let power = exponent;
  let coIdx = 0;
  while (power >= 0) {
    const pascalCoef = coeffecients[coIdx];

    let termCoef = nomial**coIdx * varCoef**power * pascalCoef;

    if (power === 0) {
      if (termCoef !== 0) terms.push(String(termCoef));
    } else if (power === 1) {
      if (termCoef === 1) termCoef = '';
      if (termCoef === -1) termCoef = '-';
      if (termCoef !== 0) terms.push(termCoef + variable);
    } else {
      if (termCoef === 1) termCoef = '';
      if (termCoef === -1) termCoef = '-';
      terms.push(termCoef + variable + '^' + power);
    }

    coIdx += 1;
    power -= 1;
  }

  return combine(terms);
}

function combine(terms) {
  result = terms[0];

  for (let i = 1; i < terms.length; i++) {
    if (terms[i][0] === '-') {
      result += terms[i];
    } else {
      result += '+' + terms[i];
    }
  }

  return result;
}

function pascalsTriangle(exponent) {
  if (exponent === 0) return [1];
  if (exponent === 1) return [1, 1];

  let coeffecients = [1, 1];

  for (let count = 2; count <= exponent; count++) {
    const newCoef = [];
    let i = -1;
    let j = 0;

    while(i < coeffecients.length) {
      newCoef.push(
        (coeffecients[i] || 0) + (coeffecients[j] || 0)
      );
      i++;
      j++;
    }

    coeffecients = newCoef;
  }

  return coeffecients;
}

function parse(expr) {
  let [ _, coeffecient, variable, nomial, exponent ] = expr.match(
    /([-+]?\d*)([a-z])([+-]\d+)\)\^(\d+)/i
  );
  if (coeffecient === '-') coeffecient = -1;
  return [
    Number(coeffecient) || 1,
    variable,
    Number(nomial),
    Number(exponent)
  ];
}

console.log(expand("(x+1)^0"));
console.log(expand("(x+1)^1"));
// expand("(x+1)^2");      // returns "x^2+2x+1"
// console.log(expand("(p-1)^3"));      // returns "p^3-3p^2+3p-1"
// expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
// expand("(-2a-4)^0");    // returns "1"
// expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
// expand("(r+0)^203");    // returns "r^203"
// expand("(-x-1)^2");     // returns "x^2+2x+1"
