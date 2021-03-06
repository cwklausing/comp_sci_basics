/**
 * Created by cwklausing on 8/22/16.
 */
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
    while(swapped);
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

//Brian: "Bubble sort is never useful, insertion sort is occasionally useful, but mostly what you're going
//to use is Merge Sort". If you use array.sort, most of the time what's happening under the hood is a
//merge sort. Our first "divide and conquer" sort function. Also a "stable sort", with a
//Big O of o(n log n).

/**
 *Splits the array into smaller and smaller arrays using recursion
 * @param nums
 */
const mergeSort = (nums) => {
    if (nums.length < 2) {
        return nums;
    }

    const length = nums.length;
    const middle = Math.floor(length / 2);
    const left = nums.slice(0, middle);
    const right = nums.slice(middle, length);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return stitch(sortedLeft, sortedRight);
};

/**
 * Stitches the split arrays from mergeSort back together in order.
 * @param left
 * @param right
 */
const stitch = (left, right) => {
    const results = [];
    while(left.length && right.length) {
        if(left[0] <= right[0]) {
            results.push(left.shift());
        }
        else {
            results.push(right.shift());
        }
    }

    //Deal with any leftover items it array
    while(left.length) {
        results.push(left.shift());
    }
    while(right.length) {
        results.push(right.shift());
    }

    return results;
};


/**
 * Brian proposed a challenge:
 * Given two sorted arrays, create a function to return the median of the combined
 * array.
 *
 * The solution: use a derivative of the 'stitch' algorithm, and return the middle
 * element (or the mean of the two middle elements).
 *
 * Also--although the function uses pop() and shift(), it maintains the original
 * state of the arrays.
 *
 * @param left
 * @param right
 */
const findMedian = (first, second) => {
    //Transfer arrays to new arrays
    let left = first.slice();
    let right = second.slice();


    let arrayLength = left.length + right.length;
    let middle = Math.floor(arrayLength/2) + 1;
    let even = (arrayLength%2 === 0);
    let sorted = [];
    let ans = undefined;

    for(var i = 0; i < middle; i++) {
        if(left[0] <= right[0]) {
            sorted.push(left.shift());
        }
        else {
            sorted.push(right.shift());
        }
    }

    if(even) {
        ans = ((sorted.pop() + sorted.pop()) / 2);
    }
    else {
        ans = sorted.pop();
    }
    return ans;
};


//Quicksort: Picks a pivot point, then sorts into two lists based on
//whether number is greater or smaller than the pivot number. Then
//sort those smaller lists (using another pivot?)
//Quicksort is usually more efficient that other methods--often more
//efficient that mergesort even-- big O of o(n log n)
//However, in worst case scenario, it can have o(n2) if you pass quicksort
//a sorted list.

/**
 * Quick sort function--gone through first round of optimizing. This optimization
 * also maintains the original array--making it a stable sort.
 *
 * @param left
 * @param right
 */
const quickSort = (nums) => {
    //base case
    if(nums.length <= 1) return nums;

    let pivot = nums[nums.length - 1];
    let left = [];
    let right = [];

    for(let i = 0; i < nums.length-1; i++) {
        if(nums[i] < pivot) {
            left.push(nums[i]);
        }
        else {
            right.push(nums[i]);
        }
    }

    return [...quickSort(left), pivot,...quickSort(right)];
}

/**
 * Jasmine Tests
 */

describe('bubble sort', () => {
    it('should sort an array correctly', () => {
        let nums = [10,5,3,8,2,6,4,7,9,1];
        bubbleSort(nums);
        expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    })
});

describe('insertion sort', () => {
    it('should sort an array correctly', () => {
        let nums = [10,5,3,8,2,6,4,7,9,1];
        insertionSort(nums);
        expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    })
});

describe('merge sort', () => {
    it('should sort an array correctly', () => {
        let nums = [10,5,3,8,2,6,4,7,9,1];
        let ans = mergeSort(nums);
        expect(ans).toEqual([1,2,3,4,5,6,7,8,9,10]);
    })
});

describe('quick sort', () => {
    it('should sort an array correctly', () => {
        let nums = [10,5,3,8,2,6,4,7,9,1];
        let ans = quickSort(nums);
        expect(ans).toEqual([1,2,3,4,5,6,7,8,9,10]);
    })
});

describe('find median', () => {
    it('should give the median of two sorted arrays', () => {
        let firstArray = [1, 3, 5];
        let secondArray = [2, 4, 6];
        let thirdArray = [3, 4, 5, 6];
        let ans = findMedian(firstArray, secondArray);
        let ans2 = findMedian(secondArray, thirdArray);
        let ans3 = findMedian(firstArray, thirdArray);
        expect(ans).toEqual(3.5);
        expect(ans2).toEqual(4);
        expect(ans3).toEqual(4);
    })
});