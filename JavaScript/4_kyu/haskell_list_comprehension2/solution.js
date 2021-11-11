function ArrayGenerator(generator) {
  if (!generator.includes('..'))
    return generator.split(',').map(Number); // HERE

  const [ _, start, next, end ] = generator.match(
    /^(-?\d+),?(-?\d+)*\.\.(-?\d+)$/).map(Number);

  const step = next - start || 1;

  if (end > start && step < 0) return [];
  if (end < start && step > 0) return [];

  let array = [];
  let n = start;

  if (end > start)
    while (n <= end) {
      array.push(n);
      n += step;
    }

  if (end < start)
    while (n >= end) {
      array.push(n);
      n += step;
    }

  return array
}

function ArrayComprehension(options) {
  if (!options.hasOwnProperty('generator')) return [];

  const generator = options.generator.replace(/\s/g, '');
  if (generator === '') return [];

  let array = ArrayGenerator(generator);

  if (options.hasOwnProperty('filters'))
    options.filters.forEach(func => {
      array = array.filter(func);
    });

  if (options.hasOwnProperty('transform'))
    array = array.map(options.transform);

  return array;
}

//Filter
function isPrime(num) {
  if (num === 1) return false;
  var result = true;
  if (num !== 2) {
    if (num % 2 === 0) {
      result = false;
    } else {
      for (var x=3; result && x<=Math.sqrt(num); x+=2) {
        if (num % x === 0) {
          result = false;
        }
      }
    }
  }
  return result;
}

function double(num) {
  return num*2;
}

function checkSumDigits(min, number) {
  return sumDigits(number) >= min;
}

var limitSumDigits = function(min) {
    return partial1(checkSumDigits, min);
};

function compose(f, g) {
    return function(x) {return f(g(x));};
}

function partial1(fn, param) {
  return function() {
    return fn.apply(null, [param].concat(Array.prototype.slice.call(arguments) || []));
  };
}

function sum(x, y) {
  return Number(x) + Number(y);
}

function sumDigits(num) {
  return String(num).split('').reduce(sum, 0);
}

//Transform
function arrayWrapper(num) {
  return [num];
}

const a = ArrayComprehension({
  generator: "1..50",
  filters: [isPrime],
  transform: arrayWrapper
});

// console.log(a);

const b = ArrayComprehension({
      generator: '1..20',
      filters: [isPrime, limitSumDigits(4)],
      transform: compose(arrayWrapper, double)
    });

// console.log(b);

const c = ArrayComprehension({
      generator: '1,5,6,78,9,-3',
      transform: arrayWrapper
    }); //  [[1],[5],[6],[78],[9],[-3]]);

console.log(c);
