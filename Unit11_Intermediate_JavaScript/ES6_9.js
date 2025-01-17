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
  "aaaaaa",
  "bbbbcccddd",
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

const containVowels = words.filter(containsVowel);

const noVowels = words.filter(function (word) {
  return !containsVowel(word);
});

///////////////////
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

const checked = Array.from(allCheckboxes).filter(function (box) {
  return box.checked;
});

const completedItems = checked.map(function (checkbox) {
  return checkbox.parentElement.innerText;
});

function extractCompletedTodos() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  return Array.from(allCheckboxes)
    .filter(function (box) {
      return box.checked;
    })
    .map(function (checkbox) {
      return checkbox.parentElement.innerText;
    });
}

/////

function myFilter(arr, callback) {
  const filteredArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      filteredArray.push(arr[i]);
    }
  }
  return filteredArray;
}

const shorties = myFilter(words, function (word) {
  return word.length <= 10;
});

const everyOtherWord = myFilter(words, function (word, i) {
  return i % 2 === 0;
});

////

words.some(function (word) {
  return word.length > 25;
});

words.some(function (word) {
  return word.indexOf("z");
});

words.every(function (word) {
  return word.indexOf("a");
});
