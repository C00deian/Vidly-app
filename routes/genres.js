const express = require("express");
const Authentication = require("../middleware/Authentication");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const router = express.Router();

const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controller/genres");


router.get("/", getGenres);
router.get("/:id", validateObjectId, getGenre);
router.post("/", Authentication, createGenre);
router.put("/:id", [Authentication, validateObjectId], updateGenre);
router.delete("/:id", [Authentication, admin, validateObjectId], deleteGenre);

module.exports = router;
