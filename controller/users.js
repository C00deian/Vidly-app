const { User, validate } = require("../model/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");




const getCurrentUser = async(req,res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user); 
}

const registerUser = async (req, res) => {
  const { error } = validate(req.body, "registration");
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(404).send("User already registered");

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = await User.create(_.pick(req.body, ["name", "email", "password"]));

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      // to read a custom header in a browser.
      .header('access-control-expose-headers', "x-auth-token")
      .status(201)
      .send(_.pick(user, ["name", "email", "_id"]));
  } catch (error) {
    throw new Error("Somte thing went wrong", error);
  }
};

const login = async (req, res) => {

  const { error } = validateUser(req.body, "login");
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  // res.status(200).send(_.pick(user, ["name", "email"]));
  res.send(token);
};

module.exports = {
  registerUser,
  login,
  getCurrentUser
};
