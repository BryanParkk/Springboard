import express from "express";
import cors from "cors";
import exercisesRoute from "./routes/exercises.js";
import mealsRoute from "./routes/meals.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/exercises", exercisesRoute);
app.use("/api/meals", mealsRoute);
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
