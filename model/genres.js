const mongoose = require("mongoose");
const Joi = require("joi");

  const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:50
  },

  // description: {
  //   type: String,
  //   // required: true
  // },
  // popularity: {
  //   type: Number,
  //   // required: true
  // },
  // typicalDuration: {
  //   type: String,
  //   // required: true
  // },
  // exampleMovies: {
  //   type: [String], // Array of strings for movie titles
  //   // required: true
  // },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  });

  return schema.validate(genre);
}

module.exports = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema
