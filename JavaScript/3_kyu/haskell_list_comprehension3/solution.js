function comprehension(options, limit = Infinity) {
  if (!options.hasOwnProperty('generator')) return [];

  const generator = options.generator.replace(/\s/g, '');
  if (generator === '') return [];

  if (!generator.includes('..'))
    return generator.split(',').map(Number);

  let [ _, start, next, end ] = generator.match(
    /^(-?\d+),?(-?\d+)*\.\.(-?\d+)?$/).map(Number);

  end = end || Infinity;

  const step = next - start || 1;

  if (end > start && step < 0) return [];
  if (end < start && step > 0) return [];

  let array = [];
  let n = start;

  let i = 0;
  if (end > start)
    while (n <= end && i < limit) {
      if (options.hasOwnProperty('filters')) {
        if (options.filters.every(func => func(n))) {
          i++;
          array.push(n);
        }
      } else {
        i++
        array.push(n);
      }

      n += step;
    }

  if (end < start)
    while (n >= end && i < limit) {
      if (options.hasOwnProperty('filters')) {
        if (options.filters.every(func => func(n))) {
          i++;
          array.push(n);
        }
      } else {
        i++
        array.push(n);
      }

      n += step;
    }

  if (options.hasOwnProperty('transform'))
    array = array.map(options.transform);

  return array;
}

const ArrayComprehension = function() {
  const lists = [];
  let nextId = 0;

  const constructor = function ArrayComprehension(options) {
    if (!(this instanceof ArrayComprehension)) {
      return new ArrayComprehension(options);
    }

    const id = nextId++;
    this.id = function getId() {
      return id;
    }
    lists.push(options);

    return this;
  };

  constructor.prototype.take = function(num) {
    console.log(this.id());
    return comprehension(lists[this.id()], num);
  };

  constructor.prototype.value = function() {
    return comprehension(lists[this.id()]);
  };

  return constructor;
}();


//


function isPrime(num) {
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

function sum(x, y) {
  return Number(x) + Number(y);
}

function sumDigits(num) {
  return String(num).split('').reduce(sum, 0);
}


function double(num) {
  return num*2;
}

function arrayWrapper(num) {
  return [num];
}


function checkSumDigits(min, number) {
  return sumDigits(number) >= min;
}

function compose(f, g) {
    return function(x) {return f(g(x));};
}

function partial1(fn, param) {
  return function() {
    return fn.apply(null, [param].concat(Array.prototype.slice.call(arguments) || []));
  };
}

var limitSumDigits = function(min) {
    return partial1(checkSumDigits, min);
};


//

var list = ArrayComprehension({
     generator: "200..",
     filters: [limitSumDigits(10), isPrime],
     transform: compose(arrayWrapper, double)
   });

// console.log(list.value());
console.log(list.take(5));

var list2 = ArrayComprehension({
     generator: "200..",
     // filters: [limitSumDigits(10), isPrime],
     // transform: compose(arrayWrapper, double)
   });

console.log(list2.take(5));
