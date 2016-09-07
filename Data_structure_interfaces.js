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

/*
  Challenge: Create your own arrayList that should have the following properties;
  -length
  -push
  -pop
  -get
  -delete
 */

class ArrayList {
    constructor() {
        this.length = 0;
        this.data = {};
    }
    push(value) {
        this.data[this.length] = value;
        this.length++;
    }
    pop() {
        const val = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return val;
    }
    get(index) {
        return this.data[index];
    }
    delete(index){
        for(let i = index; i < this.length; i++) {
            this.data[i] = this.data[i + 1];
            console.log(this.data[i])
        }
        delete this.data[this.length - 1];
        this.length--;
    }
}


/** Next, linked lists!
  *Gets are really "expensive" in linked lists, but deletes are very "cheap".
 */

class LinkedList {
    constructor() {
        this.tail = null;
        this.head = null;
        this.length = 0;
    }
    push(value) {
      const node = new Node(value);
      this.length++;
      if(!this.head) {
        this.head = node;
      }
      else {
        this.tail.next = node;
      }
      this.tail = node;
    }
    pop() {
      return this.delete(this.length-1);
    }
    _find(value, test=this.test) {
      let current = this.head;
      let i = 0;
      while(current) {
        if (test(value, current.value, i, current)) {
          return current;
        }
        current = current.next;
        i++
      }
      return null;
    }
    get(index) {
      const node = this._find(index, this.testIndex);
      if (!node) return null;
      return node.value;
    }
    delete(index){
      console.log(index);
      if (index === 0 ) {
        const head = this.head;
        if (head) {
          this.head = head.next;
        }
        else {
          this.head = null;
        }
        this.length--;
        return head.value;
      }

      const node = this._find(index-1, this.testIndex);
      const excise = node.next;
      if (!excise) return null;
      node.next = excise.next;
      if (node.next && !node.next.next) this.tail = node.next;
      this.length--;
      return excise.value;
    }
    test(a, b) {
        return a === b;
    }
    testIndex(search, __, i) {
        return search === i;
    }
    serialize() {
      const ans = [];
      let current = this.head;
      if(!current) return ans;
      while (current) {
        ans.push(current.value);
        current = current.next;
      }
      return ans;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Binary Search Trees
 * Every node of a binary search tree has either 0, 1, or two nodes.
 * Good example--a greater than/lesser than search tree.
 *
 * Not used in production, since if they're not randomized, it will just
 * result in a really crappy linked list.
 */




/**
 * Jasmine Tests
 */

xdescribe('ArrayList', function() {
    const range = length => Array.apply(null, {length: length}).map(Number.call, Number);
    const abcRange = length => range(length).map( num => String.fromCharCode( 97 + num ) );
    let list;

    beforeEach( () => {
        list = new ArrayList();
    })

    it('constructor', () => {
        expect(list).toEqual(jasmine.any(ArrayList));
    });

    it('push', () => {
        abcRange(26).map( character => list.push(character) );
        expect(list.length).toEqual(26);
    });

    it('pop', () => {
        abcRange(13).map( character => list.push(character) );
        expect(list.length).toEqual(13);
        range(10).map( () => list.pop() );
        expect(list.length).toEqual(3);
        expect(list.pop()).toEqual('c');
    });

    it('get', () => {
        list.push('first');
        expect(list.get(0)).toEqual('first');
        list.push('second');
        expect(list.get(1)).toEqual('second');
        expect(list.get(0)).toEqual('first');
        abcRange(26).map( character => list.push(character));
        expect(list.get(27)).toEqual('z');
        expect(list.get(0)).toEqual('first');
        expect(list.get(9)).toEqual('h');
        list.pop();
        expect(list.get(list.length-1)).toEqual('y');
    });

    it('delete', () => {
        abcRange(26).map( character => list.push(character) );
        list.delete(13);
        expect(list.length).toEqual(25);
        expect(list.get(12)).toEqual('m');
        expect(list.get(13)).toEqual('o');
        list.delete(0);
        expect(list.length).toEqual(24);
        expect(list.get(0)).toEqual('b');
    });

});

describe('LinkedList', function() {
    const range = length => Array.apply(null, {length: length}).map(Number.call, Number);
    const abcRange = length => range(length).map( num => String.fromCharCode( 97 + num ) );
    let list;

    beforeEach( () => {
        list = new LinkedList();
    })

    it('constructor', () => {
        expect(list).toEqual(jasmine.any(LinkedList));
    });

    it('push', () => {
        abcRange(26).map( character => list.push(character) );
        expect(list.length).toEqual(26);
    });

    it('pop', () => {
        abcRange(13).map( character => list.push(character) );
        expect(list.length).toEqual(13);
        range(10).map( () => list.pop() );
        expect(list.length).toEqual(3);
        expect(list.pop()).toEqual('c');
    });

    it('get', () => {
        list.push('first');
        expect(list.get(0)).toEqual('first');
        list.push('second');
        expect(list.get(1)).toEqual('second');
        expect(list.get(0)).toEqual('first');
        abcRange(26).map( character => list.push(character));
        expect(list.get(27)).toEqual('z');
        expect(list.get(0)).toEqual('first');
        expect(list.get(9)).toEqual('h');
        list.pop();
        expect(list.get(list.length-1)).toEqual('y');
    });

    it('delete', () => {
        abcRange(26).map( character => list.push(character) );
        list.delete(13);
        expect(list.length).toEqual(25);
        expect(list.get(12)).toEqual('m');
        expect(list.get(13)).toEqual('o');
        list.delete(0);
        expect(list.length).toEqual(24);
        expect(list.get(0)).toEqual('b');
    });

});
