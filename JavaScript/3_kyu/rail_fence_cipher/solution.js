'use strict';

function p(grid) {
  grid.forEach(row => {
    console.log(row.map(chr => {
      if (chr) return chr;
      return ' ';
    }).join(' '));
  });
}

function railDecode(grid) {
  let rowIncrement = 1;
  let nRows = grid.length;
  let nColumns = grid[0].length;
  let limit = Math.max(nRows, nColumns);
  const co = {
    row: 0,
    column: 0,
    limitingFactor: limit === nRows ? 'rows' : 'column',
  };

  // console.log(grid);
  let result = '';
  while (co[co.limitingFactor] < limit) {
    // console.log(grid[co.row][co.column]);
    // console.log(co.row);
    result += grid[co.row][co.column];
    if (grid[co.row + rowIncrement] === undefined) rowIncrement *= -1;
    co.row += rowIncrement;
    co.column += 1;
  }
  return result;
}

function makeGrid(encodedMessage, nRails) {
  const chrs = encodedMessage.split('');
  const grid = [];
  let rowIncrement = -1;
  let row = 0;
  let column = 0;
  let colInc1 = 2 * nRails - 2;
  let colInc2 = 0;
  const colIncs = [colInc1, colInc2];
  let incdx = 0;
  const nColumns = encodedMessage.length;
  let colStart = 1;
  chrs.forEach(chr => {
    grid[row] = grid[row] || [];
    grid[row][column] = chr;
    column += colIncs[incdx];
    incdx ^= 1;
    if (colIncs[incdx] === 0) incdx ^= 1;
    if (column >= nColumns) {
      row += 1;
      column = colStart++;
      colIncs[0] -= 2;
      colIncs[1] += 2;
      if (row === nRails -1) incdx = 1;
    }
  });

  let r = 0;
  grid.forEach(row => {
    grid[r++] = sparseMap(row, e => e || null);
  });
  return grid;
}

function sparseMap(array, callback) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i]));
  }
  return newArray
}

function decodeRailFenceCipher(encodedMessage, nRails) {
  if (encodedMessage.length === 0) return '';
  console.log(encodedMessage);
  const grid = makeGrid(encodedMessage, nRails);
  p(grid);
  return railDecode(grid);
}

function encodeRailFenceCipher(message, nRails) {
  message = message.split('');

  const grid = [];
  let rowIncrement = -1;
  let nRows = nRails;
  let row = 0;
  let column = 0;

  message.forEach(letter => {
    grid[row] = grid[row] || [];
    grid[row][column] = letter;
    if (row === nRails - 1 || row === 0) rowIncrement *= -1;
    row += rowIncrement;
    column += 1;
  });

  const filledGrid = sparseMap(grid, row => {
    return sparseMap(row, e => {
      return e || null;
    });
  });

  p(filledGrid);

  // function fillNum(row) {
  //   let maxLen = 0;
  //   filledGrid.forEach(row => {
  //     if (row.length > maxLen) maxLen = row.length;
  //   });
  //   return maxLen - row.length;
  // }

  const filledRows = filledGrid.map(row => {
    return row.filter(chr => chr).join('');
  });

  return filledRows.join('');
}

// const ENCODED_MESSAGE = 'W . . . E . . . C . . . R . . . L . . . T . . . E\n' +
//                         '. E . R . D . S . O . E . E . F . E . A . O . C .\n' +
//                         '. . A . . . I . . . V . . . D . . . E . . . N . .'
//
// const ENCODED_FOUR_RAILS = 'W . . . . . I . . . . . R . . . . . E . . . . . E\n' +
//                            '. E . . . D . S . . . E . E . . . E . A . . . C .\n' +
//                            '. . A . E . . . C . V . . . D . L . . . T . N . .\n' +
//                            '. . . R . . . . . O . . . . . F . . . . . O . . .'
//
// console.log(decodeRailFenceCipher(ENCODED_MESSAGE));
// console.log(encodeRailFenceCipher(MESSAGE, 4) === ENCODED_FOUR_RAILS);


const MESSAGE = 'WEAREDISCOVEREDFLEEATONCE';
//
// console.log(
//   encodeRailFenceCipher(MESSAGE, 3)
// );
//
// console.log(
//   encodeRailFenceCipher("Hello, World!", 3)
// );
//
console.log(
  decodeRailFenceCipher(encodeRailFenceCipher(MESSAGE, 8), 8)
);
//
// const RAILS = 3
// console.log(
//   decodeRailFenceCipher(
//     encodeRailFenceCipher(MESSAGE, RAILS), RAILS));

// console.log(
//   decodeRailFenceCipher('', RAILS)
// );

// const MSG = "om t iiie  i a iaet vu drrtuf  isepatiodPeitabne  mneospr!a f r r,iittlietetuia res aouuVeeiee ua goialict   ai eseuocmi nme ni  jxsixpr!s iuAsicneim nstedvuot.tcir tus knDmtt, anpsorori sqef dedeemmnlraua ar a pm!siefeiecv or rosqn is eeuiutap"
//
// const NR = 8;

// console.log(
//   // encodeRailFenceCipher(MSG, NR), '\n\n',
//   decodeRailFenceCipher(encodeRailFenceCipher(MSG, NR), NR)
// );

// console.log(
//   encodeRailFenceCipher('HELLO world', 5),
//   '\n',
//   decodeRailFenceCipher(encodeRailFenceCipher('Hello World', 5))
// );
