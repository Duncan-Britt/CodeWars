function byUpperBound(a, b) {
  return b[1] - a[1];
}

function sumIntervals(intervals){
  sortedIntervals = intervals.slice().sort(byUpperBound);
  const realIntervals = [];
  let g = 0;
  let l = 0;
  let previousLower = Infinity;

  while (g !== sortedIntervals.length) {
    let upper = sortedIntervals[g][1];
    let lower;

    while (sortedIntervals[l] &&
           sortedIntervals[l][1] >= sortedIntervals[g][0]) {
      lower = sortedIntervals[l++][0];
    }

    ng = l - 1;
    
    while (sortedIntervals[l] &&
           sortedIntervals[l][1] >= sortedIntervals[ng][0]) {
      lower = sortedIntervals[l++][0];
    }

    lower = Math.min(
      lower,
      ...sortedIntervals.slice(g, l).map(interval => interval[0])
    )

    if (lower < previousLower) {
      realIntervals.push([lower, upper]);
      previousLower = lower;
    }

    g = l;
  }

  return realIntervals.reduce((acc, interval) => {
    return acc + interval[1] - interval[0];
  }, 0);
}

console.log(
sumIntervals( [
   [1,2],
   [6, 10],
   [11, 15]
] ) // => 9
);

console.log(
sumIntervals( [
   [1,4],
   [7, 10],
   [3, 5]
] ) // => 7
);

console.log(
sumIntervals( [
   [1,5],
   [10, 20],
   [1, 6],
   [16, 19],
   [5, 11]
] ) // => 19
);

console.log(
  sumIntervals([
    [ 1, 20 ],
    [ 2, 19 ],
    [ 5, 15 ],
    [ 8, 12 ],
  ]) // 19
);

console.log(
  sumIntervals([
    [ 71, 478 ],
    [ -452, 478 ],
    [ 440, 472 ],
    [ 298, 458 ],
    [ 429, 438 ],
    [ 348, 366 ],
    [ -103, -92 ]
  ] )
); // 930
