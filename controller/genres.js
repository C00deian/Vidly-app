const Course = require("../model/genres");
const validateGenre = require("../validation");

// get all Genres
async function getGenres(req, res) {
  const genres = await Course.find();
  if (genres.length === 0) return res.status(404).json("No Record found");
  res.status(200).send(genres);
}

// get a single Genre
async function getGenre(req, res) {
  const genre = await Course.findById(req.params.id);
  if (!genre)
    return res.status(404).send("Genre with the given ID is not found");
  res.status(200).send(genre);
}

//   create a new Genre
const createGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingGenre = await Course.findOne({ name: req.body.name });
  if (existingGenre)
    return res.status(400).send("Genre with this name already exists.");

  try {
    const genre = await Course.create({
      name: req.body.name,
      description: req.body.description,
      popularity: req.body.popularity,
      typicalDuration: req.body.typicalDuration,
      exampleMovies: req.body.exampleMovies,
    });

    res.status(201).send(genre); // Respond with the newly created document
  } catch (err) {
    res.status(500).send("Error saving genre: " + err.message);
  }
};

// update Genre
const updateGenre = async (req, res) => {
  const { name, popularity } = req.body;

  if (!name || !popularity)
    return res.status(400).send("Field should not be blank");
  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const genre = await Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        popularity: req.body.popularity,
      },
    },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("Genre with the given ID is not found");

  res.status(200).send(genre);
};

//   delete a Genre
const deleteGenre = async (req, res) => {
  const genre = await Course.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("Genre with the given ID is not found");

  res.status(200).send(genre);
};

module.exports = {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
