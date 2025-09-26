// function sum(x: number, y: number) {
//   console.log(x + y);
// }
// sum(1, 3);

// let color = "red";
// color="123";
// let score = 99;
// score = 0;

// let color:string="olive";
// color="cream";
// let high:any;
// high='google';
// high=2;
// console.log(high);

// let firstName = 'Tonya';
// firstName = firstName + 1+1;
// console.log(firstName);
// let names: number[];
// names = [2,3,4,5,6]
// const stuff: (string | number)[] = [2, 'abc', 3, '3423']

// let currentUser:{username: string, age: number} = {username: "colt", age: 30}
// function printUsername(user: {username: string, age: number}): void{
//   console.log(user.username)
// }
// printUsername({username: "Teddy", age: 39});


////////////////// Interface ////////////////// 
interface User {
  username: string;
  age: number;
  email?: string;
}

const admin: User = {
  username: "bryan",
  age: 40,
  email: "bryan1010110@gmail.com"
}

function printUsername(user: User): void{
  console.log(user.username)
}

function printUserAge(user: User) :void {
  console.log(user.age);
}

function isAdult(user: User) :boolean {
  return user.age >= 18;
}

function makeRandoUser(name: string) :User {
  return {
    username: name,
    age: Math.floor(Math.random() * 100),
  }
}
////////////////// ////////////////// ////////////////// 

let age: number | string;
age=39;
age='thirty'

function printThing(thing:string| number ) {
  console.log(thing.toUpperCase());
}

const otherStuff: (number | string) [] = [12, "google"];

////////////////// ////////////////// ////////////////// 

async function getData() :Promise<string> {
  return "SOME API DATA"
}