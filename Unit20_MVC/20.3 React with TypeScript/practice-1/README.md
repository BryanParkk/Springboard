# 새로 타입스크립트 관련 프로젝트 만들경우 참고

mkdir my-ts-app && cd my-ts-app
npm init -y
npm i axios
npm i -D typescript ts-node @types/node
npx tsc --init

# library install types (lodash와 같이 패키지 설치 후 type 정보가 없는 경우)

npm install {lib name}
npm install @types/{lib name}

# typescript react template proj

npx create-react-app todo-ts-demo --template typescript

# convert into Typescript app

"npm install --save typescript @types/node @types/react @types/react-dom @types/jest"
rename all of my files : .ts to .tsx
