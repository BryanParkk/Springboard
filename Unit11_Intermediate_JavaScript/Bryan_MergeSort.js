function merge(arr1, arr2) {
    const results = [];
    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
        results.push(arr1[i]);
        i++;
        } else {
            results.push(arr2[j]);
            j++;
        }
    }
    while(i < arr1.length) {
        results.push(arr1[i]);
        i++
    }
    while(j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
}


function mergeSort(arr) {
    if(arr.length <= 1) return arr;
    const mid = Math.floor(arr.length/2);
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid)); 
    return merge(left, right); 
}
s
console.log( mergeSort([-9,2,6,18,63,236,63,-3,1,-63]) );

