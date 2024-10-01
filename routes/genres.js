const express = require("express");
const Authentication = require("../middleware/Authentication");
const admin = require('../middleware/admin')
const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controller/genres");


const router = express.Router();

router.get("/",  getGenres);
router.get("/:id", getGenre);
router.post("/", Authentication ,createGenre);
router.put("/:id", updateGenre);
router.delete("/:id",[Authentication , admin] , deleteGenre);



module.exports = router;
