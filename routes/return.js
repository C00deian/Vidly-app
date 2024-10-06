// const Joi = require("joi");
const validate = require("../middleware/validate");
const { Rental } = require("../model/rental");
const { Movie } = require("../model/movie");
const { Auth } = require("../middleware/Authentication");
const joi = require("@hapi/joi");
joi.objectId = require("joi-objectid")(joi);

const express = require("express");

const router = express.Router();

router.post("/", [Auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");

  rental.return();
  await rental.save();

  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.send(rental);
});

function validateReturn(req) {
  const schema = joi.object({
    customerId: joi.objectId().required(),
    movieId: joi.objectId().required(),
  });

  return schema.validate(req);
}

module.exports = router;
