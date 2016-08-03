let wr = (msg='------------') => document.write(`<br>${msg}`);

let functionCalls = 0;

function basicRecursion(max, current) {
  if (current > max) return;
  wr(current);
  basicRecursion(max, current+1);
}

wr('Basic Recursion')
basicRecursion(5,1);
wr()
wr('Fibonacci Sequence');

function fibonacci(n) {
  functionCalls++;
  if(n <= 2) {
    return 1;
  }
  else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
};

//But, this is a very inelegant solution, since the fibonacci function
//is called thousands of times.
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
