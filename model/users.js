const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    // unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    unique: true,
  },

  isAdmin: Boolean
});



userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({ _id: this._id , isAdmin:this.isAdmin }, process.env.SECRET_KEY);
  return token;
};


const User = mongoose.model("User", userSchema);


function validateUser(req, type) {
  let schema;

  if (type === "registration") {
    schema = Joi.object({
      name: Joi.string()
        .min(5)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required(),
    });
    
  } else if (type === "login") {
    schema = Joi.object({
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5).max(255)
        .required(),
    });
  }

  return schema.validate(req , type);
}

exports.User = User;
exports.validate = validateUser;

