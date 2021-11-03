// input: ordered list of integers
// output: string of list contracted with ranges
//
// iterate through list
// check to see if next number is previous + 1;
//   if no, add number to result string
//   if so, continue through the list until the next is no longer the previous
//     add the previous after a dash to the result string

function solution(list) {
  let result = String(list[0]);

  let i = 0;
  let j = 1;
  let k = 2;

  while (i < list.length) {
    if (list[j] === list[i] + 1 && list[k] === list[j] + 1) {
      result += '-';

      while(list[j] === list[i] + 1) {
        j++;
        i++;
        k++;
      }

      result += list[i];
    } else {
      if (j === list.length) break;

      result += (',' + list[j]);
      i++;
      j++;
      k++;
    }
  }

  return result;
}

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));
