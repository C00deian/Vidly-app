const mongoose = require("mongoose");
const winston = require("winston");

async function dbConnection() {
  await mongoose
    .connect(process.env.PROD_URI)
    .then(() => {
      console.log("Vidly database connected succesfully");
    })
    .catch((err) => {
      console.log("database connection failed...", err);
    });
}

dbConnection();
