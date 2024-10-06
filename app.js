const error = require("./middleware/error");
require("dotenv").config();
require("./db/config");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors())
// middleware
require("./startup/routes")(app);
// require('./startup/logging')(app);
// require('./startup/cors')(app);

app.use(error);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Vidly app running on port ${port}...`);
});
