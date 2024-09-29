const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  popularity: {
    type: Number,
    // required: true
  },
  typicalDuration: {
    type: String,
    // required: true
  },
  exampleMovies: {
    type: [String], // Array of strings for movie titles
    // required: true
  },
});

const Course = mongoose.model("Genre", genreSchema);

module.exports = Course;
