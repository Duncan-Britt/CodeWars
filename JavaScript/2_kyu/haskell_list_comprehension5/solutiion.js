function makeSequenceGenerator(n, step) {
  return function() {
    return {
      next() {
        let m = n;
        n += step;
        return m;
      },
    };
  };
}

function getLimit(start, end, step) {
  if (step === 0) return 0;
  if (end > start && step < 0) {
    return 0;
  }
  if (end < start && step > 0) {
    return 0;
  }

  return Math.floor(
          (Math.abs(end - start) + 1) / step);
}

function ArrayComprehension(options) {
  const data = {};
  let limit;
  data.generator = options.generator;
  if (typeof data.generator === 'string') {
    data.generator = options.generator.replace(/\s/g, '');
  }

  if (data.generator instanceof Function) {
    limit = Infinity;
    data.generateSequence = function() {
      return this.generator();
    };
  } else if (data.generator === '') {
    limit = 0;
    data.generateSequence = function() {
      return {
        next() {},
      };
    };
  } else if (!data.generator.includes('..')) {
    const list = data.generator.split(',').map(Number);
    limit = list.length;
    data.generateSequence = function() {
      let i = 0;
      return {
        limit: list.length,

        next() {
          const e = list[i];
          i = (i + 1) % this.limit;
          return e;
        },
      };
    };
  } else {
    let [ _, start, next, end ] = data.generator.match(
      /^(-?\d+),?(-?\d+)*\.\.(-?\d+)?$/).map(Number);
    const step = Number.isNaN(next) ? (end || Infinity) > start ? 1 : -1 : next - start;
    end = step >= 0 ? (end || Infinity) : (end || -Infinity);
    limit = getLimit(start, end, step);

    data.generateSequence = makeSequenceGenerator(start, step);
  }

  data.methods = [];
  const f = count => count < limit;
  f.type = 'limit';
  f.count = 0;
  data.methods.push(f);

  if (options.filters) {
    data.methods = options.filters.map(filter => {
      const f = filter.bind(null);
      f.type = 'filter';
      return f;
    });
  }
  if (options.transform) {
    const f = options.transform;
    f.type = 'map';
    data.methods.push(f);
  }

  data.value = function value() {
    const sequence = this.generateSequence();
    let n = sequence.next();
    const result = [];
    while (true) {
      let m = n;
      n = sequence.next();
      let filtered = false;

      for (let i = 0; i < this.methods.length; i++) {
        const method = this.methods[i];
        let broken = false;

        switch (method.type) {
          case 'filter':
            if (!method(m)) {
              filtered = true;
              broken = true;
            }
            break;
          case 'map':
            m = method(m);
            break;
          case 'cond':
            if (!(method(m))) {
              this.methods.filter(f => f.type === 'limit')
                          .forEach(f => f.count = 0);
              return result;
            }
            break;
          case 'limit':
            if (!(method(method.count))) {
              this.methods.filter(f => f.type === 'limit')
                          .forEach(f => f.count = 0);
              return result;
            }
            method.count++;
            break;
        }

        if (broken) break;
      }

      if (filtered) continue;

      result.push(m);
    }

    this.methods.filter(f => f.type === 'limit')
                .forEach(f => f.count = 0);

    return result;
  };

  data.take = function take(limit) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.limit = this.limit // do we need this? ?????????
    list.methods = this.methods.slice();
    const f = i => i < limit;
    f.type = 'limit';
    f.count = 0;
    list.methods.push(f);
    return list;
  };

  data.map = function map(func) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.limit = this.limit;
    list.methods = this.methods.slice();
    const f = func.bind(null); // consider custom wrapper
    f.type = 'map';
    list.methods.push(f);
    return list;
  };

  data.filter = function filter(func) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.limit = this.limit;
    list.methods = this.methods.slice();
    const f = func.bind(null);
    f.type = 'filter';
    list.methods.push(f);
    return list;
  };

  data.takeWhile = function takeWhile(cond) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.limit = this.limit;
    list.methods = this.methods.slice();
    const f = cond.bind(null);
    f.type = 'cond';
    list.methods.push(f);
    return list;
  };

  data.constructor = ArrayComprehension;

  return data;
}

////

function fibonacciGenerator() {
	var value1 = 1;
	var value2 = 1;
	return {
		next: function() {
			var current = value2;
			value2 = value1;
			value1 += current;
			return current;
		}
	};
}


function createArrayGenerator(arr) {
	return function() {
		return arrayGenerator(arr);
	};
}

function arrayGenerator(arr) {
	var index = 0;
	return {
		next: function() {
			if (index < arr.length) {
				return arr[index++];
			} else {
				return null;
			}
		}
	};
}


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

function arrayWrapper(value) {
	return [value];
}


function valueUnwrapper(value) {
	return value[0];
}


function checkSumDigits(min, number) {
	return sumDigits(number) >= min;
}

function compose(f, g) {
	if (!f) {
		return g;
	}
	if (!g) {
		return f;
	}
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


function addOne(value) {
  return value + 1;
}

function isEven(value) {
  return value % 2 === 0;
}

////

var list = ArrayComprehension({
    generator: '1,4..',
  });

console.log(list);
const a = list.filter(isPrime).take(10**3).value();
console.log(a);
