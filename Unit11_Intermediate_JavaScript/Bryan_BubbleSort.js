function bubbleSort1(arr) {
    let count = 0;
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<arr.length; j++) {
            count++;
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    console.log(arr);
    console.log("TOTAL COUNT: ", count);
    return arr;
}

function bubbleSort2(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            count++;
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log("TOTAL COUNT :", count);
    return arr;
}

bubbleSort1([45,6,7,23,1,19,40,32,19,99,100,34,35,36,23,22,1,-9]);
bubbleSort2([45,6,7,23,1,19,40,32,19,99,100,34,35,36,23,22,1,-9]);
