const express = require("express");
const cors = require("cors");
const exercisesRoute = require("./routes/exercises");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/exercises", exercisesRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
