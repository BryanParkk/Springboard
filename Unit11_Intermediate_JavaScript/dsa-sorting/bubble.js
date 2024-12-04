function bubbleSort(arr) {
    for(let j = 0; j < arr.length; j++) {
        for(let i = 0; i < arr.length; i++) {
            let swap = 0;
            if (arr[i] > arr[i+1]) {
                swap = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = swap;
                i++;
            }
        }
    }
    return arr;
}

bubbleSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
bubbleSort([0, -10, 7, 4]); // [-10, 0, 4, 7]
bubbleSort([1, 2, 3]); // [1, 2, 3]
bubbleSort([]);

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34,
    23, 2, 453, 546, 75, 67, 4342, 32
];

bubbleSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67,
                  // 75, 232, 232, 453, 546, 4342]
                  
module.exports = bubbleSort;