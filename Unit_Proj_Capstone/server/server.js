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
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) =>
  res.json({ ok: true, ts: new Date().toISOString() })
);

app.use("/api/auth", authRoute);
app.use("/api/logs", requireAuth, logsRoute);
app.use("/api/user", requireAuth, userRoute);
app.use("/api/exercises", exercisesRoute);
app.use("/api/meals", mealsRoute);
app.use("/api/routines", requireAuth, routinesRoute);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
