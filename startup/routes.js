const express = require("express");
const genresRoute = require("../routes/genres");
const usersRoute = require("../routes/users");
const customerRoute = require("../routes/customer");
const movieRoute = require("../routes/movie");
const rentalRoute = require("../routes/rental");

module.exports = function (app) {

  app.use(express.json());
  app.use("/api/genres", genresRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/customers", customerRoute);
  app.use("/api/movies", movieRoute);
  app.use("/api/rentals", rentalRoute);
  
};
