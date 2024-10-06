const { Customer, validate } = require("../model/customer");

// get all customers
const customers = async (req, res) => {
  const customers = await Customer.find().select("-__v").sort("name");
  res.status(200).send(customers);
};

// get a single customer
const getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-__v");
  if (!customer)
    return res.status(404).send("Customer with the given ID was  not found");
  res.send(customer);
};

// create customers
const createCustomer = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check for customer existance

  // create user
  try {
    const result = await Customer.create({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    });
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error saving customer : " + err.message);
  }
};

// update customer detail
const updateCustomer = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
    },
    {
      new: true,
    }
  );

  if (!customer)
    return res.status(404).send("Customer with the given ID was  not found");
  res.send(customer);
};

// delete customers
const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
};

module.exports = {
  customers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
