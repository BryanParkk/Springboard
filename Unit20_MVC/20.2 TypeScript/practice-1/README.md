# start type script

npx tsc --init

# tsconfig.json

{
"compilerOptions": {
"target": "ES6",
"module": "commonjs",
"outDir": "./dist",
"rootDir": "./src",
"strict": true
}
}

# file structure

project/
├─ src/
│ └─ index.ts
├─ dist/
└─ tsconfig.json

# compile

npx tsc

//
