// input: beginning and end of a range (m, n)
// output: arrow of tuples containing:
//         - number: squared divisors of which sum to a square int
//         - the sum of squared divisors
//
// 1, 2, 3, 6, 7, 14, 21, 42
//
// need greatest number less than or equal to n, whose divisors sum to square
// need divisors of thats square number
//
// then next greatest
//
// 1, 4, 9, 36, 49, 196, 441, 1764 => sum: 2500

function listSquared(m, n) {
  const result = [];

  for (let i = m; i <= n; i++) {
    const divisors = get_divisors(i);

    const sum = divisors.reduce((acc, n) => {
      return acc + n**2;
    }, 0);

    const isSquare = (Math.sqrt(sum) === Math.floor(Math.sqrt(sum)));

    if (isSquare) {
      result.push([i, sum]);
    }
  }

  return result
}

function get_divisors(n) {
  const divisors = [];

  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      if (n / i === i) {
        divisors.push(i);
      } else {
        divisors.push(i);
        divisors.push(n / i);
      }

    }
  }

  return divisors;
}

// const divisors = get_divisors(246);
// console.log(divisors);

// console.log(listSquared(259, 500));
