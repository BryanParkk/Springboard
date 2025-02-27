function setup() {
    noCanvas();
    delay(2000)
    .then(() => createP('hello'))
    .catch((err) => console.error(err));

    // delay('promising')
    // .then(() => createP('hello'))
    // .catch((err) => console.error(err));
}

function delay(time) {
    return new Promise((resolve, reject) => {
        if (isNaN(time)) {
            reject(new Error('delay requires a valid number.'));
        } else {
        setTimeout(resolve, time);
        }
    });
    // setTimeout(sayHello, time);
}


// function sayHello() {
//     createP('Hello');
// }
