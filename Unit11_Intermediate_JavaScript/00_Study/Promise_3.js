function setup() {
    noCanvas();
    delayES8(1000)
    .then(() => createP('helloa'))
    .catch((err) => console.error(err));

    // delay('promising')
    // .then(() => createP('hello'))
    // .catch((err) => console.error(err));
}

async function delayES8(time) {
    // This function returns a promise!
    await delay(time);
    // await someThingElse();
    // let val = await somethingElseElse();
    // return val;
    return;

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
