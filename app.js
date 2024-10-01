require("./db/config");
const express = require("express");
const genresRoute = require("./routes/genres");
const usersRoute = require("./routes/users");
const app = express();

// middleware
app.use(express.json());

// Genres routes
app.use("/api/genres", genresRoute);
app.use("/api/users", usersRoute);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log("Vidly App listning on Port:", port);
});
