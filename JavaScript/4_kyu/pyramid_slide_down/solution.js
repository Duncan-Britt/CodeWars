function longestSlideDown (pyramid) {
  pyramid = pyramid.slice();
  let i = pyramid.length - 2;
  let j = 0;

  while(i >= 0) {
    for (let j = 0; j < pyramid[i].length; j++) {
      if (pyramid[i + 1][j] > pyramid[i + 1][j + 1]) {
        pyramid[i][j] += pyramid[i + 1][j];
      } else {
        pyramid[i][j] += pyramid[i + 1][j + 1];
      }
    }
    i--;
  }
  return pyramid[0][0];
}

function longestSlideDown (pyramid, i = pyramid.length - 2) {
  if (i === -1) return pyramid[0][0];

  return longestSlideDown(
    pyramid.slice(0, i)
           .concat(
             [row(
              pyramid[i + 1],
              pyramid[i]
             )]
           ), i - 1);
}

function row([ a, b, ...t ], [ c, ...u ], res = []) {
  if (b === undefined) return res;

  return row([b].concat(t), u, res.concat(Math.max(a + c, b + c)));
}

const a = longestSlideDown([
  [3],
  [7, 4],
  [2, 4, 6],
  [8, 5, 9, 3],
]);

console.log(a);
