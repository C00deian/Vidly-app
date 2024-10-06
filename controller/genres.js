const asyncHandler = require("../middleware/asyncHandler");
const Genre = require('../model/genres');
const validateGenre = require('../model/genres')


// get all Genres
const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find().select('-__v').sort("name");
  if (genres.length === 0) return res.status(404).json("No Record found");
  res.status(200).send(genres);
});


// get a single Genre
const getGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("-__v");
  if (!genre)
    return res.status(404).send("Genre with the given ID is not found");
  res.status(200).send(genre);
});


//   create a new Genre
const createGenre = asyncHandler(async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingGenre = await Genre.findOne({ name: req.body.name });
  if (existingGenre)
    return res.status(400).send("Genre with this name already exists.");

  try {
    const genre = await Genre.create({
      name: req.body.name,
    });

    res.status(201).send(genre); // Respond with the newly created document
  } catch (err) {
    res.status(500).send("Error saving genre: " + err.message);
  }
});

// update Genre
const updateGenre = asyncHandler(async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("Genre with the given ID is not found");

  res.status(200).send(genre);
});

//   delete a Genre
const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("Genre with the given ID is not found");

  res.status(200).send(genre);
});

module.exports = {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
