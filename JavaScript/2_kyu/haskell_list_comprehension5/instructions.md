This is the fifth part. You must do the previous part first Haskell List Comprehension (iv).

Now we want ArrayComprehension has map(fn) and filter(fn)methods.

Their behavior is the same as the equivalent methods in Javascript Array.

map(fn) transforms the elements in the array with the passed function. For example:

function addOne(value) {
  return value + 1;
}

//in JavaScript
[1,2,3].map(addOne); //[2,3,4]

//in ArrayComprehension
ArrayComprehension({
    generator: '1..3'
}).map(addOne).value(); //[2,3,4]
filter(fn) removes the elements when de passed function returns false. For example:

function isEven(value) {
  return value % 2 === 0;
}

//in JavaScript
[1,2,3].filter(isEven); //[2]

//in ArrayComprehension
ArrayComprehension({
    generator: '1..3'
}).filter(isEven).value(); //[2]
Note that the order of execution is important:

ArrayComprehension({
    generator: '1..10'
}).take(10).filter(isPrime).map(addOne).value(); //[ 2, 3, 4, 6, 8 ]

ArrayComprehension({
    generator: '1..'
}).take(10).map(addOne).filter(isPrime).value(); //[ 2, 3, 5, 7, 11 ]

ArrayComprehension({
    generator: '1..',
  filters[isPrime]
}).take(10).map(addOne).filter(isPrime).value(); //[ 2, 3 ]


ArrayComprehension({
    generator: '1..',
  filters[isPrime]
}).map(addOne).filter(isPrime).take(10).value(); //System frozen. Probably there is no ten numbers wich such condition.


function arrayWrapper(value) {
    return [value];
}

ArrayComprehension({
    generator: '1..',
  filters[isPrime],
    transform: arrayWrapper // <- Converts each number to an array of one number 1 -> [1]
}).map(addOne).filter(isPrime).take(10).value(); //[ '11', '31', '71', '131', '191' ] <- map -> The elements are arrays, then array.toString() is called. For example [2] + 1 = 21

function valueUnwrapper(value) {
    return value[0];
}

ArrayComprehension({
    generator: '1..',
  filters[isPrime],
    transform: arrayWrapper
}).map(valueUnwrapper).map(addOne).filter(isPrime).take(10).value(); //[ 2, 3 ]


ArrayComprehension({
    generator: '1..',
  filters[isPrime],
    transform: arrayWrapper
}).map(valueUnwrapper).map(addOne).filter(isPrime).take(10).map(arrayWrapper).value(); //[  [ 2 ], [ 3 ] ]
