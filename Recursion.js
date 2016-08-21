/**
 * Function to write to the DOM
 * @param msg
 */
let wr = (msg='------------') => document.write(`<br>${msg}`);
let functionCalls = 0;

/**
 * Increment to see how many times recursive function runs
 */
function incrementFuncCalls(){
  functionCalls++;
}

/**
 * Basic Recursion Function
 * @param max
 * @param current
 */
function basicRecursion(max, current) {
  if (current > max) return;
  wr(current);
  basicRecursion(max, current+1);
}
//Basic recursion print
wr('Basic Recursion');
basicRecursion(5,1);
wr()
//Next section
wr('Fibonacci Sequence');

/**
 * Fibonacci function using recursion
 * @param n
 * @returns {*}
 */
function fibonacci(n) {
  incrementFuncCalls();
  if(n <= 2) {
    return 1;
  }
  else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
};

//But, this is a very inelegant solution, since the fibonacci function
//is called thousands of times.
/**
 * for calling fibonacci function--limits input to 25 or less, prints each iteration
 * @param num
 * @returns {string}
 */
function writeFib(num) {
  if(num > 25) return "too large";
  //Iterate over loop a
  for (var i = 1; i <= num; i++) {
    wr(`${i}. ${fibonacci(i)}`);
  }
  //log total number of times fibonacci is called
  wr(`Fibonacci calls: ${functionCalls}`);
}

writeFib(20);

/**
 * Recursive function to make factorials
 *
 * @param num
 */
function factorial(num) {
  if(num > 1) {
    return num * factorial(num-1)
  }
  else {
    return num
  }
}

factorialFive = factorial(5);

wr(`Factorial 5: ${factorialFive}`);


//Bubble sort:
//Goes through list, swaps them if they're out of order.
//If something was swapped in the previous run through program,
//Run the bubble sort again.
//Because there's an outer loop and an inner loop, the big O is n^2

/**
 * bubble sort function
 * @param nums
 */
const bubbleSort = (nums) => {
  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < nums.length; i++) {
      console.log(nums);
      //if the element is larger than the element after it...
      if (nums[i] > nums[i+1]) {
        //swap the two values in the array
        const temp = nums[i];
        nums[i] = nums[i+1];
        nums[i+1] = temp;
        swapped = true
      }
    }
  }
  while(swapped) {
  }
}

//However, bubble sort is extremely inefficient, because it continues to compare values that we already know
//to be sorted.
//So instead, we do an "insertion sort": Start with an array of one number, than add numbers into
//the new array in correct orders.

/**
 * insertionSort takes in array nums and creates new 'spliced' array of sorted numbers, then
 * inserts new numbers into this sorted array.
 * Big O is slightly better than bubble sort, but only marginally and in some situations.
 * @param nums
 */
const insertionSort = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] < nums[j]) {
        const spliced = nums.splice(i, 1);
        nums.splice(j, 0, spliced[0]);
      }
    }
  }
}
/**
 * Jasmin Tests
 */
describe('fibonacci', () => {
  it('should add from 1 n times according to the fibonacci sequence', () => {
    expect(fibonacci(2)).toEqual(1);
    expect(fibonacci(3)).toEqual(2);
    expect(fibonacci(4)).toEqual(3);
    expect(fibonacci(5)).toEqual(5);
    expect(fibonacci(10)).toEqual(55);
  });
});

describe('factorial', () => {
  it('should multiply n!', function() {
    expect(factorial(3)).toEqual(6);
    expect(factorial(4)).toEqual(24);
    expect(factorial(5)).toEqual(120);
    expect(factorial(10)).toEqual(3628800);
  });
});

describe('bubble sort', () => {
  it('should sort an array correctly', () => {
    var nums = [10,5,3,8,2,6,4,7,9,1];
    bubbleSort(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
  })
});

describe('insertion sort', () => {
  it('should sort an array correctly', () => {
    var nums = [10,5,3,8,2,6,4,7,9,1];
    insertionSort(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
  })
});