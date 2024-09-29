const Joi = require("joi");

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(20).required(),
    popularity: Joi.number().min(2).required(),
    typicalDuration: Joi.string().min(5).required(),
    exampleMovies: Joi.array().items(Joi.string()).required(),
  });

  return schema.validate(genre);
}
module.exports = validateGenre;
