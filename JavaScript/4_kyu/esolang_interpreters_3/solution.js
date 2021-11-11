// grid[row][col]
function initialize(width, height) {
  const grid = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width);

    for (let j = 0; j < width; j++) {
      grid[i][j] = 0;
    }
  }

  return grid;
}

function gridToStr(grid) {
  let result = "";
  let r = 0
  for (; r < grid.length - 1; r++) {
    result += grid[r].join('') + "\r\n";
  }

  return result + grid[r].join('');;
}

// function nextToken(code, tp) {
//   while (!/[nesw*\[\]]/.test(code[tp]))
//     tp++;
//
//   return [code[tp], tp + 1];
// }

function mod(a, b) {
  return (a % b + b) % b;
}

function skip(code, tp) {
  let m = -1;
  tp++;

  while (m) {
    code[tp] === '[' ? m-- : code[tp] === ']' ? m++ : null;
    tp++;
  }

  return tp;
}

function skipBack(code, tp) {
  let m = -1;

  while (m) {
    code[tp] === ']' ? m-- : code[tp] === '[' ? m++ : null;
    tp--;
  }

  return tp + 2;
}

function interpreter(code, iterations, width, height) {
  code = code.replace(/[^nesw*\[\]]/g, '');
  const grid = initialize(width, height);
  let dp = [0, 0];
  let tp = 0;
  for (let i = 0; i < iterations; i++) {
    let tok;
    // [ tok, tp ] = nextToken(code, tp);
    tok = code[tp++];
    if (!tok) break;

    switch (tok) {
      case 'n': dp[0] = mod(dp[0] - 1, height); break;
      case 'e': dp[1] = mod(dp[1] + 1, width); break;
      case 's': dp[0] = mod(dp[0] + 1, height); break;
      case 'w': dp[1] = mod(dp[1] - 1, width); break;
      case '*': grid[dp[0]][dp[1]] ^= 1; break;
      case '[': grid[dp[0]][dp[1]] === 0 && (tp = skip(code, tp)); break;
      case ']': grid[dp[0]][dp[1]] && (tp = skipBack(code, tp - 2)); break;
    }

  }

  return gridToStr(grid);
}

const a = interpreter('*[es*]', 9, 5, 6);
console.log(a);
