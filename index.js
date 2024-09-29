const express = require("express");
const app = express();
const genres = require("./genres.json");
const validateGenre = require("./validation");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii Boss  Server Calling...");
});

// get all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// get a single genre
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genres with the given ID was not found");

  res.send(genre);
});

// create genre
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

// update a genre
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genres with the given ID was not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});


// delete Genre 
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre)
    return res.status(404).send("Genres with the given ID was not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log("App listning on Port:", port);
});
