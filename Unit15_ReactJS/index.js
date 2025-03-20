// Front End Frameworks
// - Larger JS libraries , methods
// - provide "blueprint" for apps
// - provide for code re-use, templating of HTML
// - Opinionated, -> How you should design a JS app

// Popular Front end Frameworks
// - Angular , Ember, Vue , React
const myArray = [6, 19, 20];
const yourArray = [19, 81, 2];
for (let i = 0; i < myArray.length; i++) {
  for (let j = 0; j < yourArray.length; j++) {
    if (myArray[i] === yourArray[j]) {
      console.log("Both arrays have the number: " + yourArray[j]);
    }
  }
}
