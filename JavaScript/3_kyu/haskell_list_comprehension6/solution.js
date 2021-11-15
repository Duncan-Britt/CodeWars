function copyObject(obj) {
  const result = {};

  Object.getOwnPropertyNames(obj).forEach(key => {
    result[key] = obj[key] instanceof Function ? copyFunc(obj[key]) : obj[key];
  });

  return result;;
}

function copyFunc(func) {
  const f = function(...args) {
    return func.apply(this, args);
  }

  Object.getOwnPropertyNames(func).forEach(key => f[key] = func[key]);
  return f;
}

function makeSequenceGenerator(n, step) {
  return function() {
    return {
      n,
      step,
      next() {
        let m = this.n;
        this.n += this.step;
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
    if (options.mutable) {
      data.sequence = data.generator();
      data.sequence.nth = 0;
    } else {
      data.generateSequence = function() {
        return data.generator();
      };
    }
  } else if (data.generator === '') {
    limit = 0;
    data.generateSequence = function() {
      return {
        next() {},
      };
    };

    if (options.mutable) {
      data.sequence = data.generateSequence();
    }

  } else if (!data.generator.includes('..')) {
    const list = data.generator.split(',').map(Number);
    limit = list.length;


    data.generateSequence = function() {
      return {
        limit: list.length,
        i: 0,
        next() {
          const e = list[i];
          this.i = (this.i + 1) % this.limit;
          return e;
        },
      };
    };

    if (options.mutable) {
      data.sequence = data.generateSequence();
    }
  } else {
    let [ _, start, next, end ] = data.generator.match(
      /^(-?\d+),?(-?\d+)*\.\.(-?\d+)?$/).map(Number);
    const step = Number.isNaN(next) ? (end || Infinity) > start ? 1 : -1 : next - start;
    end = step >= 0 ? (end || Infinity) : (end || -Infinity);
    limit = getLimit(start, end, step);

    if (options.mutable) {
      data.sequence = makeSequenceGenerator(start, step)();
    } else {
      data.generateSequence = makeSequenceGenerator(start, step);
    }
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

  data.nextFromSequence = function(sequence) {
    let n;

    while (true) {
      let n = sequence.next();
      console.log(n);
      if (this.isMutable() && this.generator instanceof Function) sequence.nth++
      let filtered = false;

      for (let i = 0; i < this.methods.length; i++) {
        const method = this.methods[i];
        let broken = false;

        switch (method.type) {
          case 'filter':
            if (!method(n)) {
              filtered = true;
              broken = true;
            }

            break;
          case 'map':
            n = method(n);
            break;
          case 'cond':
            if (!(method(n))) return null;

            break;
          case 'limit':
            if (!(method(method.count))) return null;

            method.count++;
            break;
        }

        if (broken) break;
      }

      if (!filtered) return n;
    }

  }

  data.next = function next() {
    if (this.isMutable()) {
      return this.nextFromSequence(this.sequence);
    } else {
      n = this.nextFromSequence(this.generateSequence());
      this.methods.filter(f => f.type === 'limit')
                  .forEach(f => f.count = 0);
      return n;
    }
  }

  data.value = function value() {
    sequence = this.isMutable() ? this.sequence : this.generateSequence();
    const result = [];

    while (true) {
      const n = this.nextFromSequence(sequence);

      if (n) {
        result.push(n);
      } else {
        if (!(this.isMutable())) {
          this.methods.filter(f => f.type === 'limit')
                      .forEach(f => f.count = 0);
        }

        return result;
      }
    }
  }

  data.take = function take(limit) {
    const list = ArrayComprehension({
      generator: this.generator,
      mutable: this.isMutable(),
    });

    list.methods = this.methods.map(f => copyFunc(f));
    const f = i => i < limit;
    f.type = 'limit';
    f.count = 0;
    list.methods.push(f);

    if (this.isMutable()) {
      if (this.generator instanceof Function) {
        list.sequence = function() {
          const s = this.generator()
          for (let i = 0; i < this.sequence.nth; i++) {
            this.nextFromSequence(s);
          }
          return s;
        }.call(this);

        list.sequence.nth = this.sequence.nth;
      } else {
        list.sequence = copyObject(this.sequence);
      }

      for (let i = 0; i < limit; i++) {
        this.nextFromSequence(this.sequence);
      }

    }

    return list;
  };

  data.map = function map(func) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.methods = this.methods.slice();
    const f = copyFunc(func)
    f.type = 'map';
    list.methods.push(f);

    if (this.isMutable()) {
      if (this.generator instanceof Function) {
        list.sequence = function() {
          const s = this.generator()
          for (let i = 0; i < this.sequence.nth; i++) {
            this.nextFromSequence(s);
          }
          return s;
        }.call(this);

        list.sequence.nth = this.sequence.nth;
      } else {
        list.sequence = copyObject(this.sequence);
        console.log(list);
      }

    }

    return list;
  };

  data.filter = function filter(func) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.methods = this.methods.slice();
    const f = func.bind(null);
    f.type = 'filter';
    list.methods.push(f);
    return list;
  };

  data.takeWhile = function takeWhile(cond) {
    const list = ArrayComprehension({ generator: this.generator } );
    list.methods = this.methods.slice();
    const f = cond.bind(null);
    f.type = 'cond';
    list.methods.push(f);
    return list;
  };

  data.isMutable = function isMutable() {
    return !!options.mutable;
  }

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
  generator: fibonacciGenerator,
  mutable: true
});

console.log(list.take(10).filter(isPrime).map(double).value());
console.log(list.take(4).value());
console.log(list.take(10).map(double).value());
