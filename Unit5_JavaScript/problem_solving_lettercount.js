//
//
let count = {
    key:['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    value:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
//console.log(count.key[0]);

let word = 'HELLO';
word = word.toLowerCase();
let idx = 0;



for(let i = 0; i < word.length; i++) {

    count.value[count.key.indexOf('h')] +=1;
}

console.log(count.value);


// a의 인덱스를 구하라. 

// word의 a위치에 있는 a는 count.key에서 0번쨰에 위치하고 있다.


// console.log(word);


// let init = 'aaaa';
// let num = init.indexOf('a');
// console.log(num);

//h 들어왔다. h 카운터를 1 증가시킨다. 
//e 들어왔다. e 카운터를 1 증가시킨다.
//...
// 