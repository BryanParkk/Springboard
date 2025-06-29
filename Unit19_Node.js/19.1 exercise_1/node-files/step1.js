const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

// 명령어 인수에서 파일 경로를 읽어와 실행하기
const path = process.argv[2];

if (!path) {
  console.error("Usage: node step1.js <file-path>");
  process.exit(1);
}

cat(path);
