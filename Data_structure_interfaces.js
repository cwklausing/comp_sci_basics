/**
 * Created by cwklausing on 8/26/16.
 */
/*Data structure interfaces:
 A data structure interface is one in which consumer of data doesn't know how it works
 underneath--it's a black box, basically.
 */

/*
 Sets: A set is something that you can add, remove, contains, and toList.
 sets are also useful since you can only add something to a set once--de-duplication.
 Included in ES6
 */

/*
  Maps: (aka dictionaries) - Similar to javascript objects. A set/collection of keys
  that have values associated with those keys. However, unlike js objects, no prototypes,
  inheritance, or methods.

  Basically just key/value pairs.

  Do not necessarily have order--bad for ordering things.
 */

/*
  Stacks: last in, first out. For instance, if your stack is [1] and you push 2 onto it,
  now you can no longer get at 1 until you take 2 off the stack.

  We program on a stack--you can only do one thing at a time, pushing functions onto the
  stack, doing them, popping them off the stack. Or adding more things to the stack.
 */

/*
  Queue: First in, first out. For ex, a printer. You can also do priority queues, where
  things have different ratings and get pushed to different spots in the queue.
 */

/*Moving on...
    Implimentation!
    Note: Javascript is a 'garbage-collected language where we don't have to worry about
    allocation and de-allocation.
 */

/* Array List: in array list, index is descriptive of where things are that you want.
  However, shifting elements in array lists are really hard--because if you have an array
  of 10,000,000 values, then inserting or deleting the second one is hugely expensive. So
  the tradeoff is getting speed (fast to find w/array list) but slow on altering list.
 */