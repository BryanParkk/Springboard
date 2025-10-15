// // server/server.js
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import exercisesRoute from "./routes/exercises.js";
// import mealsRoute from "./routes/meals.js";
// import authRoute from "./routes/auth.js";
// import userRoute from "./routes/user.js";
// import requireAuth from "./middleware/requireAuth.js";
// import routinesRoute from "./routes/routines.js";
// import logsRoute from "./routes/logs.js";

// const app = express();

// // 1) 프록시 신뢰 (Render 같은 PaaS 뒤에 있을 때 IP/HTTPS 판별 정확)
// app.set("trust proxy", 1);

// // 2) CORS: 환경변수 ALLOWED_ORIGINS로 제한
// const allowed = (process.env.ALLOWED_ORIGINS || "")
//   .split(",")
//   .map((s) => s.trim())
//   .filter(Boolean);

// app.use(
//   cors({
//     origin(origin, cb) {
//       if (!origin) return cb(null, true); // same-origin, curl 등 허용
//       if (allowed.length === 0 || allowed.includes(origin))
//         return cb(null, true);
//       return cb(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

// // 3) JSON 파서
// app.use(express.json({ limit: "1mb" }));
// app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// // 4) 헬스체크
// app.get("/api/health", (req, res) =>
//   res.json({ ok: true, ts: new Date().toISOString() })
// );

// // 5) 라우팅
// app.use("/api/auth", authRoute);
// app.use("/api/logs", requireAuth, logsRoute);
// app.use("/api/user", requireAuth, userRoute);
// app.use("/api/exercises", exercisesRoute);
// app.use("/api/meals", mealsRoute);
// app.use("/api/routines", requireAuth, routinesRoute);

// // 6) 404 & 에러 핸들러(선택)
// app.use((req, res) => res.status(404).json({ error: "NOT_FOUND" }));
// app.use((err, req, res, next) => {
//   console.error("[SERVER ERROR]", err?.message || err);
//   res.status(500).json({ error: "INTERNAL_ERROR" });
// });

// // 7) 포트는 환경변수 우선
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server/server.js //
import express from "express";
import cors from "cors";
import morgan from "morgan";

import exercisesRoute from "./routes/exercises.js";
import mealsRoute from "./routes/meals.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import requireAuth from "./middleware/requireAuth.js";
import routinesRoute from "./routes/routines.js";
import logsRoute from "./routes/logs.js";

const app = express();

// 프록시 신뢰
app.set("trust proxy", 1);

// 테스트용 CORS — 모든 Origin 허용
app.use(
  cors({
    origin: true, // 요청한 Origin을 그대로 허용
    credentials: true, // 쿠키/인증 정보 포함 허용
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON 파서 & 로깅
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 헬스체크
app.get("/api/health", (req, res) =>
  res.json({ ok: true, ts: new Date().toISOString() })
);

// 라우팅
app.use("/api/auth", authRoute);
app.use("/api/logs", requireAuth, logsRoute);
app.use("/api/user", requireAuth, userRoute);
app.use("/api/exercises", exercisesRoute);
app.use("/api/meals", mealsRoute);
app.use("/api/routines", requireAuth, routinesRoute);

// 404 & 에러핸들러
app.use((req, res) => res.status(404).json({ error: "NOT_FOUND" }));
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err?.message || err);
  res.status(500).json({ error: "INTERNAL_ERROR" });
});

// 포트
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
