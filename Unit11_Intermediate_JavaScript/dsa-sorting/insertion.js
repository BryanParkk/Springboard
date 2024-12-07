function insertionSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        //start while loop
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

console.log( insertionSort([4, 20, 12, 10, 7, 9]) );
console.log( insertionSort([4, 20, 12, 10, 7, 9]) ); // [4, 7, 9, 10, 12, 20]
console.log( insertionSort([0, -10, 7, 4]) ); // [-10, 0, 4, 7]
console.log( insertionSort([1, 2, 3]) ); // [1, 2, 3]
console.log( insertionSort([]) );
let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2,
    453, 546, 75, 67, 4342, 32
];
console.log( insertionSort(nums) ); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34,
                     //  34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

module.exports = insertionSort;