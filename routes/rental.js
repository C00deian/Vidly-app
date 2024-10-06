const express = require("express");
const { rentals, getRental, createRental } = require("../controller/rental");
const router = express.Router();



router.get("/", rentals);
router.get("/:id", getRental);
router.post("/create-rental", createRental);

module.exports = router;
