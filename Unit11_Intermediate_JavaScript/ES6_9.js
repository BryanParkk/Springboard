//filter
const words = [
  "iasdflkagncvjvrieajsdklnwfdas",
  "asdfasdfasdfasdfasdfasdf",
  "zxcvzxcvzxcvzxcvzxcv",
  "qwerqwreqwerqwer",
  "qwerasdfvczcxvzvsdawervfgbafwec",
  "jukijuhyujhyyjuuyjmh",
];

words.filter(function (word) {
  if (word.length >= 20) {
    return true;
  } else {
    return false;
  }
});
