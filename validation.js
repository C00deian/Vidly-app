const Joi = require("joi");

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(20).required(),
    popularity: Joi.number().min(2).required(),
    typicalDuration: Joi.string().min(5).required(),
    exampleMovies: Joi.array().items(Joi.string()).required()
  });

  return schema.validate(genre);
}




function validateUser(req, type) {
  let schema;

  if (type === "registration") {
    // Validation schema for user registration
    schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });
    
  } else if (type === "login") {
    // Validation schema for user login
    schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });
  }

  return schema.validate(req);
}

module.exports = {validateGenre,validateUser};
