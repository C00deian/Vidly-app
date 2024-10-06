const express = require("express");
const auth = require("../middleware/Authentication");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const {
  movies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movie");
const router = express.Router();

router.get("/", movies);
router.get("/:id", [auth], getMovie);
router.put("/:id", [auth], updateMovie);
router.post("/addMovie", validateObjectId, addMovie);
router.delete("/:id", [auth, admin], deleteMovie);

module.exports = router;
