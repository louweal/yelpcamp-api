const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.json({ success: true, campground });
};

module.exports.deleteReview = async (req, res) => {
  const { id, rid } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: rid } });
  await Review.findByIdAndDelete(rid);
  res.json({ success: true });
};
