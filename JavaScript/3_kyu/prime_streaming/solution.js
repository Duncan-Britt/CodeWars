class PriorityQueue {
  constructor() {
    this.q = new Array(100000);
    this.lastIdx = -1;
  }

  min() {
    return this.q[0]['n'];
  }

  insert(prime) {
    let i = this.lastIdx++ + 1;
    this.q[i] = prime;

    let p = Math.floor((i - 1) / 2);
    while (p >= 0 && this.q[p]['n'] > this.q[i]['n']) {
      [ this.q[p], this.q[i] ] = [ this.q[i], this.q[p] ];
      i = p;
      p = Math.floor((i - 1) / 2);
    }
  }

  pp(p = 0, pf = '', isLeft = true, l = 2 * p + 1, r = 2 * p + 2) {
    if (this.q[r]) this.pp(r, `${pf}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${pf}${isLeft ? '└── ' : '┌── '}${this.q[p]['i']}: ${this.q[p]['n']}`);
    if (this.q[l]) this.pp(l, `${pf}${isLeft ? '    ' : '│   '}`, true);
  }

  incMinAndRebalance() {
    this.q[0]['n'] += this.q[0]['i'];
    let p = 0;
    let l = 1;
    let r = 2;

    while ((this.q[l] && this.q[p]['n'] > this.q[l]['n']) ||
           (this.q[r] && this.q[p]['n'] > this.q[r]['n'])) {
      if (this.q[l]['n'] <= this.q[r]['n']) {
        [ this.q[l], this.q[p] ] = [ this.q[p], this.q[l] ];
        p = 2 * p + 1;
      } else {
        [ this.q[r], this.q[p] ] = [ this.q[p], this.q[r] ];
        p = 2 * p + 2;
      }

      l = 2 * p + 1;
      r = 2 * p + 2;
    }
  }
}

class Primes2 {
  static * stream() {
    yield(2);
    let pQ = [{ i: 2, n: 4 }];

    let j;
    const incMin = function() {
      const init = pQ[0]['n'];

      for (j = 0; pQ[j] ; ++j) {
        if (pQ[j]['n'] === init) {
          pQ[j]['n'] += pQ[j]['i'];
        } else {
          break;
        }
      }
    };

    const sort = function() {
      const le = j;

      let li = 0;
      let ri = j;

      const newList = [];

      while (li < le) {
        if (pQ[li]['n'] < pQ[ri]['n']) {
          newList.push(pQ[li++]);
        } else if (pQ[li]['n'] === pQ[ri]['n']) {
          if (pQ[li]['i'] < pQ[ri]['i']) {
            newList.push(pQ[li++]);
          } else {
            newList.push(pQ[ri++]);
          }
        } else {
          newList.push(pQ[ri++]);
        }
      }

      pQ = newList.concat(pQ.slice(ri));
    }

    let i = 3;
    for(; true; i++) {
      if (pQ[0]['n'] === i) {
        incMin();
        sort();;
      } else {
        yield(i);
        pQ.push({ i: i, n: i**2 });
      }
    }
  }
}

class Primes {
  static * stream() {
    yield(2);
    const pQ = new PriorityQueue();
    pQ.insert({ i: 2, n: 4});

    let i = 3;
    for(; true; i += 1) {
      // pQ.pp();
      // console.log();
      // console.log();
      const min = pQ.min();
      if (min === i) {
        while (pQ.min() === min) {
          pQ.incMinAndRebalance();
        }
      } else {
        yield(i);
        pQ.insert({ i: i, n: i**2 });
      }
    }
  }
}

const a = Primes2.stream();
const b = Primes.stream();

const LIMIT = 10000;
for (let i = 0; i < LIMIT; i++) {
  process.stdout.write(`${a.next().value} ${b.next().value}\n`);
}
