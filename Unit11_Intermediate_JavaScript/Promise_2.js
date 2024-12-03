// function setup() {
//     noCanvas();
//     setTimeout(sayHello, 1000);
// }

// function sayHello() {
//     createP('Hello');
// }

function setup() {
    createCanvas(100, 100);
  
    background(200);
  
    // Create a paragraph element and set its position.
    let p = createP('Tell me a story.');
    p.position(5, 0);
  
    describe('A gray square displaying the text "Tell me a story." written in black.');
  }