const mongoose = require("mongoose");
const { Movie } = require("../model/movie");
const { Rental } = require("../model/rental");
const { Customer } = require("../model/customer");

const rentals = async (req, res) => {
  const rentals = await find().select("-__v").sort("-dateOut");
  res.send(rentals);
};

const createRental = async (req, res) =>  {

 const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);

  if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

    const rental = new Rental({
      
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      },
      
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  const session = await mongoose.startSession(); // Start a session

  try {
    session.startTransaction(); // Start the transaction

    await rental.save({ session }); // Save rental with session
    await Movie.updateOne(
      { _id: movie._id },
      { $inc: { numberInStock: -1 } },
      { session } // Use the session for the update
    );

    await session.commitTransaction(); // Commit the transaction
      res.send(rental);
      
  } catch (ex) {
      
    await session.abortTransaction(); // Abort the transaction on error
      console.error("Transaction failed:", ex);
      
      res.status(500).send("Something failed.");
      
  } finally {
    session.endSession();
  }
};

const getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id).select("-__v");

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
};

module.exports = {
  rentals,
  createRental,
  getRental,
};
