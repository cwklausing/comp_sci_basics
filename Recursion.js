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