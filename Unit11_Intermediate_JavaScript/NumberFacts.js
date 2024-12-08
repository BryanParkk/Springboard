//Part 1.
//1. fact about my favorite number
fetch("http://numbersapi.com/4?json")
  .then((response) => response.json())
  .then((data) => {
    console.log("1.");
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//2. multiple numbers
fetch("http://numbersapi.com/7,10,14?json")
  .then((response) => response.json())
  .then((data) => {
    console.log("2.");
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//3. favorite number
const favoriteNumber = 14; // 예시로 7을 좋아하는 숫자로 설정

// request
const requests = Array(14)
  .fill(`http://numbersapi.com/${favoriteNumber}?json`)
  .map((url) => fetch(url).then((response) => response.json()));

Promise.all(requests)
  .then((responses) => {
    responses.forEach((response, index) => {
      console.log(`Fact #${index + 1}:`, response.text); // 각 사실을 콘솔에 출력
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
