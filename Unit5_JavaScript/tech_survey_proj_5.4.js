//Technical Survey Project - part 2 - Exercise 4

//Given code
const emblemClue1 = "Eagle";
const emblemClue2 = "Laurel";
const emblemClue3 = 7;

//Step 1
var location;

if (emblemClue1 === "Eagle") {
    location = "Forum";
}else if (emblemClue1 === "Lion") {
    location = "Colossum";
}else {
    location = "Villa";
}

//Step 2
if (emblemClue2 === "Laurel" && location === "Forum") {
    location = `${location} of Augustus`;
}else if (emblemClue2 === "Graphes" && location === "Villa") {
    location = `${location} of Pompey`;
}

//Step 3
switch(emblemClue3) {
    case 3: 
        location += ` South`;
        break;
    case 4:
        location += ` West`;
        break;
    case 7: 
        location += ` North`;
        break;
    case 9:
        location += ` East`;
        break;
}

//Question
// 	== compares only values, while === compares both values and data types.

console.log(location);