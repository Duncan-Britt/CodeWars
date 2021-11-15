This is the sixth part. You must do the previous part first Haskell List Comprehension (v).

If you've gotten this far, you may have noticed that lists we are building do not keep the state.

For example:

var list = ArrayComprehension({
  generator: "1..10"
});

list.take(2).value(); //[1, 2] Retrieves the first two elements
list.take(2).value(); //[1, 2] Retrieves the first two elements. The list does not keep the state
This behavior may seem strange and unhelpful. But it is one of the principles on which functional programming is based. A function must always return the same result for the same input parameters. Functional programming dislikes mutability and avoid storing the state. This will get more reliability in code, reuse is improved and the tests are easier. In my point of view, this also makes our code less useful.

In this kata, we will allow our list can behave both ways: mutable or immutable.

By default the list is immutable, but, if when you create the list, pass the parameter mutable = true, the behavior will change and the list is mutable.

var list = ArrayComprehension({
  generator: "1..5",
  mutable: true
});
xº
list.take(2).value(); //[1, 2] Retrieves the first two elements
list.take(2).value(); //[3, 4] Retrieves the next two elements.
list.take(10).value(); //[5] Retrieves the last element.
list.take(1).value(); //[] Empty list. The list is exhausted.
See another examples:

var list = ArrayComprehension({
  generator: "1..10",
  mutable: true
});

list.take(2).take(1).value(); //[1] The first `take()` call, retrieves two first elements, the second get the first of them.
list.take(2).take(1).value(); //[3]

list = ArrayComprehension({
  generator: "1..10",
  mutable: true
});

var l = list.take(2); //Gets the two firts elements
l.take(1).value(); //[1] the first elements of them
l.take(1).value(); //[2] the second element of them
One more thing we can do is to implement the next() method. This method returns the next value in the list, or null if there are no values.

For example:

var list = ArrayComprehension({
  generator: "1..3",
  mutable: true
});

list.next(); //1
list.next(); //2
list.next(); //3
list.next(); //null The list is exhausted.
list.next(); //null
In immutable lists, next() always returns the first element.

var list = ArrayComprehension({
  generator: "1..3",
  mutable: false
});

list.next(); //1
list.next(); //1
Note that next() and value() can be combined

var list = ArrayComprehension({
  generator: "1..3",
  mutable: true
});

list.next(); //1
list.value(); //[2, 3]
list.next(); //null
list.value(); //[]

var list = ArrayComprehension({
  generator: "1..3",
  mutable: false
});

list.next(); //1
list.value(); //[1, 2, 3]
list.next(); //1
