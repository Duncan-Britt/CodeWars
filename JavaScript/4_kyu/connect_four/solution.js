const IDX = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
};

function parseDrop(drop) {
  const column = IDX[drop.slice(0, 1)];
  const player = drop.slice(2);
  return { column, player };
}

function isWinner(grid) {
  return fourInARow(grid) ||
         fourInAColumn(grid) ||
         diagonalNE(grid) ||
         diagonalNW(grid);
}

function fourInARow(grid) {
  let row = 5;
  while (row >= 0) {
    let column = 0;
    let streak;
    let current;
    for (; column < 7; column++) {
      if (current && grid[row][column] === current) {
        if (++streak === 4) return current;
      } else {
        current = grid[row][column];
        streak = 1;
      }
    }
    row--;
  }

  return null;
}

function fourInAColumn(grid) {
  let column = 0;
  while (column < 7) {
    let row = 5;
    let streak;
    let current;
    for (; row >= 0; row--) {
      if (current && grid[row][column] === current) {
        if (++streak === 4) return current;
      } else {
        current = grid[row][column];
        streak = 1;
      }
    }
    column++;
  }

  return null
}

function diagonalNE(grid) {
  let row = 5;
  let column;
  let initial = true;
  while (row >= 3) {
    column = initial ? 3 : 0;
    initial = false;
    while (column >= 0) {
      let r = row;
      let c = column;
      let streak;
      let current;
      while (r >= 0 && c < 7) {
        if (current && grid[r][c] === current) {
          if (++streak === 4) return current;
        } else {
          current = grid[r][c];
          streak = 1;
        }
        r--;
        c++;
      }
      column--;
    }
    row--;
  }
  return null;
}

function diagonalNW(grid) {
  let row = 5;
  let column;
  let initial = true;
  while (row >= 3) {
    column = initial ? 3 : 0;
    initial = false;
    while (column <= 6) {
      let r = row;
      let c = column;
      let streak;
      let current;
      while (r >= 0 && c >= 0) {
        if (current && grid[r][c] === current) {
          if (++streak === 4) return current;
        } else {
          current = grid[r][c];
          streak = 1;
        }
        r--;
        c--;
      }
      column++;
    }
    row--;
  }
  return null;
}

function initialGrid() {
  const grid = new Array(6);
  for (let i = 0; i < 6; i++) {
    grid[i] = new Array(7);
  }
  return grid;
}

function pp(grid) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      let spot = grid[r][c]
      let chr = spot === 'Red' ? 'r' : spot === 'Yellow' ? 'y' : '.';
      process.stdout.write(' ' + chr)
    }
    console.log();
  }
  console.log();
}

function whoIsWinner([drop, ...drops], grid = initialGrid()) {
  if (drop === undefined) return 'Draw';
  const { column, player } = parseDrop(drop);
  let row = 0;
  while (grid[row + 1] && !(grid[row + 1][column])) {
    row++;
  }
  grid[row][column] = player;
  pp(grid);
  const winner = isWinner(grid);
  return winner ? winner : whoIsWinner(drops, grid);
}

let pieces = [
  'A_Red',
  'D_Yellow',
  'A_Red',
  'B_Yellow',
  'C_Red',
  'F_Yellow',
  'G_Red',
  'C_Yellow',
  'G_Red',
  'C_Yellow',
  'B_Red',
  'C_Yellow',
  'E_Red',
  'B_Yellow',
  'F_Red',
  'F_Yellow',
  'D_Red',
  'A_Yellow',
  'D_Red',
  'G_Yellow',
  'G_Red',
  'A_Yellow',
  'C_Red',
  'E_Yellow',
  'A_Red',
  'B_Yellow',
  'F_Red',
  'C_Yellow' ]

console.log(whoIsWinner(pieces)); 
