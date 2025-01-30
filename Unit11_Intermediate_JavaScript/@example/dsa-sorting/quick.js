/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, left, right){
    let pivotValue = arr[right];
    let pivotIndex = left;

    for(let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            //compare smaller value using destructuring assignment
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
        }
    }
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

    return pivotIndex;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
    if(left < right) {
        let pivotIndex = pivot(arr, left, right);

        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

// test
console.log(quickSort([4, 20, 12, 10, 7, 9]));  // [4, 7, 9, 10, 12, 20]
console.log(quickSort([0, -10, 7, 4]));         // [-10, 0, 4, 7]
console.log(quickSort([1, 2, 3]));              // [1, 2, 3]
console.log(quickSort([]));                     // []

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34,
    23, 2, 453, 546, 75, 67, 4342, 32
];

console.log(quickSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

module.exports = quickSort;