const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./validationSchemas.js");
const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError(401, "Unauthorized");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);

  if (!campground.author.equals(req.user._id)) return res.json({ success: false, message: "Permission denied" });
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const review = await Review.findById(req.params.rid);

  if (!review.author.equals(req.user._id)) return res.json({ success: false, message: "Permission denied" });
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
    // console.log(error);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    // console.log(error);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
