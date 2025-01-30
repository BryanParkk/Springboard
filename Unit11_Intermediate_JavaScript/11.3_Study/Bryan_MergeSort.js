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
    // console.log('mid: ', mid);
    const left = mergeSort(arr.slice(0,mid));
    // console.log('left: ', left);
    const right = mergeSort(arr.slice(mid)); 
    // console.log('right: ', right);
    return merge(left, right); 
}

console.log( mergeSort([-9,2,6,18,63,236,63,-3,1,-63]) );



function mergeSort2(arr) {
    if(arr.length <= 1) return arr;
}
