console.log("Hello this is ES6_9.js");

//filter
const words = [
  "iasdflkagncvjvrieajsdklnwfdas",
  "asdfasdfasdfasdfasdfasdf",
  "zxcvzxcvzxcvzxcvzxcv",
  "qwerqwreqwerqwer",
  "qwerasdfvczcxvzvsdawervfgbafwec",
  "jukijuhyujhyyjuuyjmh",
  "byeongil",
  "eunji",
];

const longWords = words.filter(function (word) {
  if (word.length >= 20) {
    return true;
  } else {
    return false;
  }
});

const longWords2 = words.filter(function (word) {
  return word.length >= 20;
});

const filterWords = words.filter(function (w) {
  return w[0] === "z" || w[0] === "v";
});

const containsVowel = function (word) {
  for (let char of word) {
    if (isVowel(char)) return true;
  }
  return false;
};

const isVowel = function (char) {
  return "aeiou".indexOf(char) != -1;
};
