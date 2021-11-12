function gatherElements(options) {
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
    while (n <= end && i < options.limit) {
      if (options.cond && !options.cond(n)) break;
      if (options.filters) {
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
    while (n >= end && i < options.limit) {
      if (options.cond && !options.cond(n)) break;
      if (options.filters) {
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

  return array
}

function comprehension(options) {
  if (!options.generator) return [];

  let array;
  if (options.generator instanceof Function) {
    array = [];
    const sequence = options.generator();
    let i = 0;
    while (i < options.limit) {
      n = sequence();
      if (options.cond && !options.cond(n)) break;
      if (options.filters) {
        if (options.filters.every(func => func(n))) {
          i++;
          array.push(n);
        }
      } else {
        i++
        array.push(n);
      }
    }

  } else {
    array = gatherElements(options);
  }

  if (options.transform)
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

    const _id = nextId++;
    this._id = function getId() {
      return _id;
    }
    options = Object.create(options);
    if (!options.limit) options.limit = Infinity;
    lists.push(options);

    return this;
  };

  constructor.prototype.take = function(num) {
    const options = lists[this._id()];
    newOptions = Object.create(options);
    newOptions.limit = Math.min(num, options.limit);
    return new ArrayComprehension(newOptions);
  };

  constructor.prototype.takeWhile = function(func) {
    const options = lists[this._id()];
    newOptions = Object.create(options);
    newOptions.cond = func;
    return new ArrayComprehension(newOptions);
  };

  constructor.prototype.value = function() {
    return comprehension(lists[this._id()]);
  };

  return constructor;
}();

function fibonacciGenerator() {
  let last = 0;
  let n = 1;

  return function nextFib() {
    let temp = n;
    n += last;
    last = temp;
    return last;
  }
}


// const seq = fibonacciGenerator();
//
// for (let i = 0; i < 10; i++) {
//   console.log(seq());
// }

//



function isPrime(num) {
	var result = true;
	if (num !== 2) {
		if (num % 2 === 0) {
			result = false;
		} else {
			for (var x = 3; result && x <= Math.sqrt(num); x += 2) {
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
	return num * 2;
}

function arrayWrapper(num) {
	return [num];
}


function checkSumDigits(min, number) {
	return sumDigits(number) >= min;
}

function compose(f, g) {
	return function(x) {
		return f(g(x));
	};
}

function partial1(fn, param) {
	return function() {
		return fn.apply(null, [param].concat(Array.prototype.slice.call(arguments) || []));
	};
}

var limitSumDigits = function(min) {
	return partial1(checkSumDigits, min);
};


// TEST



    var list = ArrayComprehension({
      generator: fibonacciGenerator,
    });

    const a = list.takeWhile(n => n < 10000000).value();
    console.log(a);
