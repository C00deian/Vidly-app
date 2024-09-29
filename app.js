require("./db/config");
const express = require("express");
const genresRoute = require("./routes/genres");
const app = express();

// middleware
app.use(express.json());

// Genres routes
app.use("/api/genres", genresRoute);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log("Vidly App listning on Port:", port);
});
