# installation

mkdir express-ts-demo && cd express-ts-demo
npm init -y

npm i express
npm i -D typescript tsx @types/node @types/express
npx tsc --init

# package.json

{
"name": "express-ts-demo",
"version": "1.0.0",
"type": "module",
"scripts": {
"dev": "tsx src/server.ts",
"build": "tsc",
"start": "node dist/server.js"
},
"dependencies": {
"express": "^4.19.2"
},
"devDependencies": {
"@types/express": "^4.17.21",
"@types/node": "^20.14.0",
"tsx": "^4.7.0",
"typescript": "^5.5.0"
}
}

# tsconfig.json (POINT only)

{
"compilerOptions": {
"target": "ES2020",
"module": "NodeNext",
"moduleResolution": "NodeNext",
"strict": true,
"esModuleInterop": true,
"skipLibCheck": true,
"outDir": "dist"
},
"include": ["src"]
}

# src/server.ts

import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
res.send("Hello, TypeScript + Express!");
});

app.listen(PORT, () => {
console.log(`🚀 Server running at http://localhost:${PORT}`);
});

# run

Dev mode > npm run dev

Build and Run > npm run build
npm start
