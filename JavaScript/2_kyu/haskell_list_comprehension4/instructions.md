This is the fourth part. You must do the previous part first Haskell List Comprehension (iii).

We need to do some refactoring more.

In Haskell this is valid:

take 2 (take 4 [1..]) -- returns [1,2]
Now we want that the take(num) method returns a new ArrayComprehension so we can apply the take() method again.

Something like this:

var list = ArrayComprehension({generator: "1.."});
list.take(4).take(2).value(); // returns [1,2]
One more thing, Haskell can create lists of any type. We want this in JavaScript too.

To do this, you must modify the generator param of the options object to accept generator functions. With this function we could create object of any kind.

For example:

var list = ArrayComprehension({
    generator: fibonacciGenerator
});

var list2 = ArrayComprehension({
    generator: primeGenerator
});

var list3 = ArrayComprehension({
    generator: randomGenerator
});

var list3 = ArrayComprehension({
    generator: colorGenerator
});
Finally, you must to implement the takeWhile(cond) method. This method gets values while the passed function returns true.

For example:

var list = ArrayComprehension({
    generator: fibonacciGenerator
});

list.takeWhile(function(value) {
      return value <=40;
}).value() // returns  [1,1,2,3,5,8,13,21,34]
