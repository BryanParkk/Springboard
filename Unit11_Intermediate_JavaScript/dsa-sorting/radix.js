// Counting Sort (기본 정렬 방식)
function countingSort(arr, exp) {
  let output = new Array(arr.length); // 정렬된 결과를 저장할 배열
  let count = new Array(10).fill(0); // 0~9까지의 카운트를 저장하는 배열

  // 각 자리수에 대해 카운트 배열을 갱신
  for (let i = 0; i < arr.length; i++) {
    let digit = Math.floor(arr[i] / exp) % 10; // 현재 자리수 추출
    count[digit]++;
  }

  // 카운트 배열을 갱신하여 실제 인덱스를 찾을 수 있게 만듦
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // output 배열에 올바른 위치에 값 배치
  for (let i = arr.length - 1; i >= 0; i--) {
    let digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  // 결과를 원본 배열에 복사
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

// Radix Sort
function radixSort(arr) {
  // 배열에서 가장 큰 수를 찾아 자릿수의 개수를 구함
  let max = Math.max(...arr);
  // 자릿수가 max의 자리수만큼 반복
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp); // 각 자리수를 기준으로 정렬
  }

  return arr;
}

// 테스트
console.log(radixSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(radixSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(radixSort([1, 2, 3])); // [1, 2, 3]
console.log(radixSort([])); // []

let nums = [
  4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342,
  32,
];

console.log(radixSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
