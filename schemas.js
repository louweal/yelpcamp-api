const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    reviews: Joi.array(),
    __v: Joi.number(),
    _id: Joi.string(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    __v: Joi.number(),
    _id: Joi.string(),
  }).required(),
});
