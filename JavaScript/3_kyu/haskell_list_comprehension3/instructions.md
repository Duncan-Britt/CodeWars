This is the third part. You need to do the previous part first Haskell List Comprehension (ii).

Haskell can do things like this:

[1..] //This is an infitite list
Haskell can deal with this because uses lazy evaluation. For example in Haskell:

take 4 [1,3..] //returns [1,3,5,7]
take 7 [90,89..] //returns [90,89,88,87,86,85,84]
You need to refactor the code. Now we want infinite list support.

To do that, ArrayComprehension function has to return a new object (this).

There is two methods more:

take(num): returns the first num numbers of the list. If the list has less numbers than num, returns all elements.
value(): returns all elements. It produces a infinite loop if the list is unbounded.
For example:

var list = ArrayComprehension({
  generator: "1.."
});

list.take(5); // return [1,2,3,4,5]
