const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

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


exports.User = User;
