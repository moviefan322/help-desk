const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT} 🚀`));
