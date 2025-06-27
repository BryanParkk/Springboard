import express from "express";
import cors from "cors";
import exercisesRoute from "./routes/exercises.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server 주소
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.use("/api/exercises", exercisesRoute);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
