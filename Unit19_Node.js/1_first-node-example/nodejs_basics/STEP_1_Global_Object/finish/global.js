// Global object //

console.log(global);

const interval = setInterval(() => {
  console.log("Interval 'ticks' every second");
}, 1000);


setTimeout(() => {
  console.log("The [setTimeout] method will now clear the 'interval'");
  clearInterval(interval);
}, 5000);



// directories
console.log(__dirname);
console.log(__filename);