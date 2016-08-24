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
 * Jasmine Tests
 */

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

describe('merge sort', () => {
    it('should sort an array correctly', () => {
        var nums = [10,5,3,8,2,6,4,7,9,1];
        var ans = mergeSort(nums);
        expect(ans).toEqual([1,2,3,4,5,6,7,8,9,10]);
    })
});