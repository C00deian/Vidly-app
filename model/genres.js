const mongoose = require("mongoose");
const Joi = require("joi");

  const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:50
  },
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
module.exports = genreSchema;
