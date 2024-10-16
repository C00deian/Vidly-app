const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require('moment');
const  {genreSchema}  = require("./genres");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },

    publishDate: {
      type: String,
      default: () => moment().format('MM/DD/YYYY h:mm a')
    },
  })
);


function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().hex().length(24),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
}


exports.Movie = Movie;
exports.validate = validateMovie;
