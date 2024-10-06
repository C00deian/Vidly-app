const { Movie, validate } = require("../model/movie");
const moment = require("moment");
const Genre = require("../model/genres");

const movies = async (req, res) => {
  const movies = await Movie.find().select("-__v").sort("name");
  res.send(movies);
};

const getMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id).select("-__v");
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
};

const addMovie = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    const movie = await Movie.create({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      publishDate: moment.toJSON(),
    });

    res.status(201).send(movie);
  } catch (err) {
    res.status(500).send("Error saving customer : " + err.message);
  }
};

const updateMovie = async (req, res) => {
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
};

const deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
};

module.exports = {
  movies,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovie,
};
