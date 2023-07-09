const express = require("express");
const router = express.Router({ mergeParams: true }); // because we also need to include the param 'id' from /campground/:id/reviews
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schemas.js");
const Campground = require("../models/campground");
const Review = require("../models/review");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    // console.log(error);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    // console.log(campground);
    res.json({ success: true, campground });
  })
);

router.delete(
  "/:rid",
  catchAsync(async (req, res) => {
    const { id, rid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: rid } });
    await Review.findByIdAndDelete(rid);
    res.json({ success: true });
  })
);

module.exports = router;
